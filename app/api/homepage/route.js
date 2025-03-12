import {
  filterResponseByLanguage,
  transformObject,
} from "@/app/lib/filterDataByLanguage";
import { db } from "@/app/lib/firebase";
import { HomepageSchema } from "@/app/schema/homepageSchema";
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

// GET Request: Fetch the most recent homepage data
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const lang = url.searchParams.get("lang") || "EN"; // Default to English
    const edit = url.searchParams.get("edit") === "true"; 
    const homepageCollection = collection(db, "homepage");
    const q = query(homepageCollection, orderBy("createdAt", "desc"), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return new Response(JSON.stringify({ error: "No homepage data found" }), {
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

// POST Request: Create a new homepage entry
export async function POST(req) {
  try {
    const homepageData = await req.json();

    // Validate data with Yup
    await HomepageSchema.validate(homepageData, { abortEarly: false });

    const homepageCollection = collection(db, "homepage");
    await addDoc(homepageCollection, {
      ...homepageData,
      createdAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "Homepage data saved successfully" }),
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

// PUT Request: Update an existing homepage entry by ID
export async function PUT(req) {
  try {
    const { id, ...homepageData } = await req.json();

    // Validate data with Yup
    await HomepageSchema.validate(homepageData, { abortEarly: false });

    const homepageDoc = doc(db, "homepage", id);
    await updateDoc(homepageDoc, {
      ...homepageData,
      updatedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "Homepage data updated successfully" }),
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

// DELETE Request: Delete a homepage entry by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const homepageDoc = doc(db, "homepage", id);
    await deleteDoc(homepageDoc);

    return new Response(
      JSON.stringify({ message: "Homepage data deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
