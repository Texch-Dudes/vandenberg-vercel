import { transformObject } from "@/app/lib/filterDataByLanguage";
import { db } from "@/app/lib/firebase";
import { GlobalDataSchema } from "@/app/schema/globaldataSchema";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

// Firestore Collection Reference
const settingsCollection = collection(db, "globalData");

// GET Request: Fetch site settings
// export async function GET() {
//   try {
//     const q = query(settingsCollection, orderBy("createdAt", "desc"), limit(1));
//     const snapshot = await getDocs(q);

//     if (snapshot.empty) {
//       return new Response(JSON.stringify({ error: "No site settings found" }), {
//         status: 404,
//       });
//     }

//     const data = snapshot.docs[0].data();
//     const id = snapshot.docs[0].id;

//     return new Response(
//       JSON.stringify({ success: true, data: { id, ...data } }),
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ success: false, error: error.message }),
//       {
//         status: 500,
//       }
//     );
//   }
// }

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const lang = url.searchParams.get("lang") || "EN"; // Default to English
    const edit = url.searchParams.get("edit") === "true"; 
    const settingsCollection = collection(db, "globalData");
    const q = query(settingsCollection, orderBy("createdAt", "desc"), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return new Response(JSON.stringify({ error: "No collectie page data found" }), {
        status: 404,
      });
    }

    const data = snapshot.docs[0].data();
    const id = snapshot.docs[0].id;

    console.log("Firebase Response:", JSON.stringify(data, null, 2)); // Debugging

    if (!data) {
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


// POST Request: Add new site settings
export async function POST(req) {
  try {
    const settingsData = await req.json();

    // Validate data with Yup
    await GlobalDataSchema.validate(settingsData, { abortEarly: false });

    await addDoc(settingsCollection, {
      ...settingsData,
      createdAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Site settings added successfully",
      }),
      { status: 201 }
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      return new Response(
        JSON.stringify({ success: false, errors: error.errors }),
        {
          status: 400,
        }
      );
    }
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
      }
    );
  }
}

// PUT Request: Update existing site settings by ID
export async function PUT(req) {
  try {
    const { id, ...settingsData } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "ID is required" }),
        {
          status: 400,
        }
      );
    }

    // Validate data with Yup
    await GlobalDataSchema.validate(settingsData, { abortEarly: false });

    const settingsDoc = doc(db, "globalData", id);
    await updateDoc(settingsDoc, {
      ...settingsData,
      updatedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Site settings updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      return new Response(
        JSON.stringify({ success: false, errors: error.errors }),
        {
          status: 400,
        }
      );
    }
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
      }
    );
  }
}

// DELETE Request: Delete site settings by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "ID is required" }),
        {
          status: 400,
        }
      );
    }

    const settingsDoc = doc(db, "globalData", id);
    await deleteDoc(settingsDoc);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Site settings deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
      }
    );
  }
}
