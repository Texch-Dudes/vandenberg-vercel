import {
  filterResponseByLanguage,
  transformObject,
} from "@/app/lib/filterDataByLanguage";
import { db } from "@/app/lib/firebase";
import { CollectiePageSchema } from "@/app/schema/collectiepageSchema";
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

// GET Request: Fetch the most recent collectie page data
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const lang = url.searchParams.get("lang") || "EN"; // Default to English
    const edit = url.searchParams.get("edit") === "true"; 
    const collectieCollection = collection(db, "collectiePage");
    const q = query(collectieCollection, orderBy("createdAt", "desc"), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return new Response(JSON.stringify({ error: "No collectie page data found" }), {
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

// POST Request: Create a new collectie page entry
export async function POST(req) {
  try {
    const collectieData = await req.json();

    // Validate data with Yup
    await CollectiePageSchema.validate(collectieData, { abortEarly: false });

    const collectieCollection = collection(db, "collectiePage");
    await addDoc(collectieCollection, {
      ...collectieData,
      createdAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "Collectie page data saved successfully" }),
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

// PUT Request: Update an existing collectie page entry by ID
export async function PUT(req) {
  try {
    const { id, ...collectieData } = await req.json();

    // Validate data with Yup
    await CollectiePageSchema.validate(collectieData, { abortEarly: false });

    const collectieDoc = doc(db, "collectiePage", id);
    await updateDoc(collectieDoc, {
      ...collectieData,
      updatedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "Collectie page data updated successfully" }),
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

// DELETE Request: Delete a collectie page entry by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const collectieDoc = doc(db, "collectiePage", id);
    await deleteDoc(collectieDoc);

    return new Response(
      JSON.stringify({ message: "Collectie page data deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
