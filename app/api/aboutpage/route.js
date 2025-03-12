import { transformObject } from "@/app/lib/filterDataByLanguage";
import { db } from "@/app/lib/firebase";
import { AboutPageSchema } from "@/app/schema/aboutpageSchema";
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

// GET Request: Fetch the latest "Over Ons" page data


export async function GET(req) {
  try {
    const url = new URL(req.url);
    const lang = url.searchParams.get("lang") || "EN"; // Default to English
    const edit = url.searchParams.get("edit") === "true"; 
    const aboutPageCollection = collection(db, "aboutPage");
    const q = query(aboutPageCollection, orderBy("createdAt", "desc"), limit(1));
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


// POST Request: Add a new "Over Ons" page entry
export async function POST(req) {
  try {
    const aboutPageData = await req.json();

    // Validate data with Yup
    await AboutPageSchema.validate(aboutPageData, { abortEarly: false });

    const aboutPageCollection = collection(db, "aboutPage");
    await addDoc(aboutPageCollection, {
      ...aboutPageData,
      createdAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "'Over Ons' page data saved successfully" }),
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

// PUT Request: Update an existing "Over Ons" page entry by ID
export async function PUT(req) {
  try {
    const { id, ...aboutPageData } = await req.json();

    // Validate data with Yup
    await AboutPageSchema.validate(aboutPageData, { abortEarly: false });

    const aboutPageDoc = doc(db, "aboutPage", id);
    await updateDoc(aboutPageDoc, {
      ...aboutPageData,
      updatedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "'Over Ons' page data updated successfully" }),
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

// DELETE Request: Delete an "Over Ons" page entry by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const aboutPageDoc = doc(db, "aboutPage", id);
    await deleteDoc(aboutPageDoc);

    return new Response(
      JSON.stringify({ message: "'Over Ons' page data deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
