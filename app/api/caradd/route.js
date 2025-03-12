import { db } from "@/app/lib/firebase";
import { CarSchema } from "@/app/schema/carSchema";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  startAfter,
} from "firebase/firestore";

export const runtime = "nodejs"; // Ensure we use Node.js runtime instead of Edge

// GET Request: Fetch all cars or a specific car by slug
// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get("page")) || 1;
//     const pageSize = searchParams.get("limit")
//       ? parseInt(searchParams.get("limit"))
//       : null; // Optional pagination

//     const carsCollection = collection(db, "cars");

//     // Fetch all cars if no limit is provided
//     if (!pageSize) {
//       const snapshot = await getDocs(
//         query(carsCollection, orderBy("createdAt", "desc"))
//       );
//       const cars = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       return new Response(
//         JSON.stringify({
//           data: { collectionCarsDataSection: { nodes: cars } },
//         }),
//         { status: 200 }
//       );
//     }

//     // Pagination logic
//     let q = query(
//       carsCollection,
//       orderBy("createdAt", "desc"),
//       limit(pageSize)
//     );

//     if (page > 1) {
//       const allDocs = await getDocs(
//         query(carsCollection, orderBy("createdAt", "desc"))
//       );
//       const lastDoc = allDocs.docs[(page - 1) * pageSize - 1]; // Get last doc of previous page

//       if (lastDoc) {
//         q = query(
//           carsCollection,
//           orderBy("createdAt", "desc"),
//           startAfter(lastDoc),
//           limit(pageSize)
//         );
//       }
//     }

//     const snapshot = await getDocs(q);
//     const cars = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     const totalDocs = (await getDocs(carsCollection)).size;
//     const totalPages = Math.ceil(totalDocs / pageSize);

//     return new Response(
//       JSON.stringify({
//         data: { collectionCarsDataSection: { nodes: cars } },
//         pagination: {
//           totalCars: totalDocs,
//           totalPages,
//           currentPage: page,
//           pageSize,
//         },
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//     });
//   }
// }

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    const carsCollection = collection(db, "cars");
    const categoriesCollection = collection(db, "categories");

    let snapshot;

    if (slug) {
      const q = query(carsCollection, orderBy("slug"));
      snapshot = await getDocs(q);
      const carDoc = snapshot.docs.find((doc) => doc.data().slug === slug);
      console.log("carDoc", carDoc);
      if (!carDoc) {
        return new Response(
          JSON.stringify({ error: `Car with slug "${slug}" not found` }),
          { status: 404 }
        );
      }

      const carData = carDoc.data();
      return new Response(
        JSON.stringify({
          data: { car: carData },
          extensions: {
            debug: [
              {
                type: "DEBUG_LOGS_INACTIVE",
                message:
                  "GraphQL Debug logging is not active. To see debug logs, GRAPHQL_DEBUG must be enabled.",
              },
            ],
          },
        }),
        { status: 200 }
      );
    } else {
      snapshot = await getDocs(
        query(carsCollection, orderBy("createdAt", "desc"))
      );

      if (snapshot.empty) {
        return new Response(JSON.stringify({ error: "No cars found" }), {
          status: 404,
        });
      }

      const cars = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categories = categoriesSnapshot.docs.map((doc) => ({
        databaseId: doc.id,
        ...doc.data(),
      }));

      const categoryCounts = categories.map((category) => {
        const count = cars.filter((car) =>
          car.carCategories.nodes.some(
            (node) => node.databaseId === category.databaseId
          )
        ).length;
        return { ...category, count };
      });

      return new Response(
        JSON.stringify({
          data: {
            collectionCarsDataSection: { nodes: cars },
            collectionCarCategorySection: { nodes: categoryCounts },
          },
          extensions: {
            debug: [
              {
                type: "DEBUG_LOGS_INACTIVE",
                message:
                  "GraphQL Debug logging is not active. To see debug logs, GRAPHQL_DEBUG must be enabled.",
              },
            ],
          },
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// POST Request: Add a new car
export async function POST(req) {
  try {
    const carData = await req.json();

    // Validate data with Yup
    await CarSchema.validate(carData, { abortEarly: false });

    // Fetch category details using category ID
    const categoryDoc = doc(
      db,
      "categories",
      carData.carCategories.nodes[0].databaseId
    );
    const categorySnapshot = await getDoc(categoryDoc);

    if (!categorySnapshot.exists()) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
      });
    }

    const categoryData = categorySnapshot.data();
    carData.carCategories.nodes[0] = {
      databaseId: categorySnapshot.id,
      name: categoryData.name,
    };

    const carsCollection = collection(db, "cars");
    await addDoc(carsCollection, {
      ...carData,
      createdAt: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ message: "Car added successfully" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error adding car:", error);
    if (error.name === "ValidationError") {
      return new Response(JSON.stringify({ errors: error.errors }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// PUT Request: Update an existing car by ID
export async function PUT(req) {
  try {
    const { id, ...carData } = await req.json();

    // Validate data with Yup
    await CarSchema.validate(carData, { abortEarly: false });

    const carDoc = doc(db, "cars", id);
    await updateDoc(carDoc, {
      ...carData,
      updatedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "Car updated successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      return new Response(JSON.stringify({ errors: error.errors }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}

// DELETE Request: Delete a car by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const carDoc = doc(db, "cars", id);
    await deleteDoc(carDoc);

    return new Response(
      JSON.stringify({ message: "Car deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
