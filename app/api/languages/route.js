import { db } from "@/app/lib/firebase";
import { LanguagesSchema } from "@/app/schema/languagesSchema";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// GET Request: Fetch languages
export async function GET() {
  try {
    const languagesCollection = collection(db, "languages");
    const snapshot = await getDocs(languagesCollection);

    if (snapshot.empty) {
      return new Response(JSON.stringify({ error: "No languages found" }), {
        status: 404,
      });
    }

    const languages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(languages), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// POST Request: Add new language
export async function POST(req) {
  try {
    const languagesData = await req.json();

    // Validate data with Yup
    await LanguagesSchema.validate(languagesData, { abortEarly: false });

    const languagesCollection = collection(db, "languages");
    await addDoc(languagesCollection, {
      ...languagesData,
      createdAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "Languages data saved successfully" }),
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

// DELETE Request: Delete a language by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const languageDoc = doc(db, "languages", id);
    await deleteDoc(languageDoc);

    return new Response(
      JSON.stringify({ message: "Language deleted successfully" }),
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
