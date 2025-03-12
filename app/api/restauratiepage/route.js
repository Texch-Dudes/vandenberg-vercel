import { transformObject } from "@/app/lib/filterDataByLanguage";
import { db } from "@/app/lib/firebase";
import { RestauratiePageSchema } from "@/app/schema/restauratiepageSchema";
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
} from "firebase/firestore";

// GET Request: Fetch the latest "Restauratie" page data


export async function GET(req) {
  try {
    const url = new URL(req.url);
    const lang = url.searchParams.get("lang") || "EN"; // Default to English
    const edit = url.searchParams.get("edit") === "true"; 
    const restauratieCollection = collection(db, "restauratiePage");
    const q = query(restauratieCollection, orderBy("createdAt", "desc"), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return new Response(JSON.stringify({ error: "No restauratiePage page data found" }), {
        status: 404,
      });
    }

    const data = snapshot.docs[0].data();
    const id = snapshot.docs[0].id;

    console.log("Firebase Response:", JSON.stringify(data, null, 2)); // Debugging

    if (!data.page) {
      return new Response(
        JSON.stringify({ error: "Invalid data structure: 'page' missing" }),
        {
          status: 500,
        }
      );
    }

    // Ensure the `page` field is properly structured before passing it
    const filteredData =edit?data: transformObject(data, lang);

    return new Response(JSON.stringify({ id, ...filteredData }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}



// POST Request: Add a new "Restauratie" page entry
export async function POST(req) {
  try {
    const restauratieData = await req.json();

    // Validate data with Yup
    await RestauratiePageSchema.validate(restauratieData, {
      abortEarly: false,
    });

    const restauratieCollection = collection(db, "restauratiePage");
    await addDoc(restauratieCollection, {
      ...restauratieData,
      createdAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "'Restauratie' page data saved successfully" }),
      { status: 201 }
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

// PUT Request: Update an existing "Restauratie" page entry by ID
export async function PUT(req) {
  try {
    const { id, ...restauratieData } = await req.json();

    // Validate data with Yup
    await RestauratiePageSchema.validate(restauratieData, {
      abortEarly: false,
    });

    const restauratieDoc = doc(db, "restauratiePage", id);
    await updateDoc(restauratieDoc, {
      ...restauratieData,
      updatedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        message: "'Restauratie' page data updated successfully",
      }),
      { status: 200 }
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

// DELETE Request: Delete a "Restauratie" page entry by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const restauratieDoc = doc(db, "restauratiePage", id);
    await deleteDoc(restauratieDoc);

    return new Response(
      JSON.stringify({
        message: "'Restauratie' page data deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
