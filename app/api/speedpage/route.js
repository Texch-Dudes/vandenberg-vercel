import { transformObject } from "@/app/lib/filterDataByLanguage";
import { db } from "@/app/lib/firebase";
import { SpeedPageSchema } from "@/app/schema/speedpageSchema";
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

// GET Request: Fetch the latest "Speed" page data


export async function GET(req) {
  try {
    const url = new URL(req.url);
    const lang = url.searchParams.get("lang") || "EN"; // Default to English
    const edit = url.searchParams.get("edit") === "true"; 
    const speedCollection = collection(db, "speedPage");
    const q = query(speedCollection, orderBy("createdAt", "desc"), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return new Response(JSON.stringify({ error: "No speedPage data found" }), {
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


// POST Request: Add a new "Speed" page entry
export async function POST(req) {
  try {
    const speedData = await req.json();

    // Validate data with Yup
    await SpeedPageSchema.validate(speedData, { abortEarly: false });

    const speedCollection = collection(db, "speedPage");
    await addDoc(speedCollection, {
      ...speedData,
      createdAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "'Speed' page data saved successfully" }),
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

// PUT Request: Update an existing "Speed" page entry by ID
export async function PUT(req) {
  try {
    const { id, ...speedData } = await req.json();

    // Validate data with Yup
    await SpeedPageSchema.validate(speedData, { abortEarly: false });

    const speedDoc = doc(db, "speedPage", id);
    await updateDoc(speedDoc, {
      ...speedData,
      updatedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "'Speed' page data updated successfully" }),
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

// DELETE Request: Delete a "Speed" page entry by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const speedDoc = doc(db, "speedPage", id);
    await deleteDoc(speedDoc);

    return new Response(
      JSON.stringify({ message: "'Speed' page data deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
