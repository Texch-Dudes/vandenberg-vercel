import { db } from "@/app/lib/firebase";
import {
  transformObject,
} from "@/app/lib/filterDataByLanguage";
import { ContactPageSchema } from "@/app/schema/contactpageSchema";
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

// GET Request: Fetch the latest "Contact" page data



export async function GET(req) {
  try {
    const url = new URL(req.url);
    const lang = url.searchParams.get("lang") || "EN"; // Default to English
    const edit = url.searchParams.get("edit") === "true"; 
    const contactCollection = collection(db, "contactPage");
    const q = query(contactCollection, orderBy("createdAt", "desc"), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return new Response(JSON.stringify({ error: "No contactPage page data found" }), {
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

// POST Request: Add a new "Contact" page entry
export async function POST(req) {
  try {
    const contactData = await req.json();

    // Validate data with Yup
    await ContactPageSchema.validate(contactData, { abortEarly: false });

    const contactCollection = collection(db, "contactPage");
    await addDoc(contactCollection, {
      ...contactData,
      createdAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "'Contact' page data saved successfully" }),
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

// PUT Request: Update an existing "Contact" page entry by ID
export async function PUT(req) {
  try {
    const { id, ...contactData } = await req.json();

    // Validate data with Yup
    await ContactPageSchema.validate(contactData, { abortEarly: false });

    const contactDoc = doc(db, "contactPage", id);
    await updateDoc(contactDoc, {
      ...contactData,
      updatedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "'Contact' page data updated successfully" }),
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

// DELETE Request: Delete a "Contact" page entry by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const contactDoc = doc(db, "contactPage", id);
    await deleteDoc(contactDoc);

    return new Response(
      JSON.stringify({ message: "'Contact' page data deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
