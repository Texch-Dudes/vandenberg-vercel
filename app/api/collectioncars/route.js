import { db } from "@/app/lib/firebase";
import { CollectionCarsSchema } from "@/app/schema/collectioncarsSchema";
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

// GET Request: Fetch the latest "Collection Cars Data"
export async function GET() {
  try {
    const collectionCarsCollection = collection(db, "collectionCarsData");
    const q = query(
      collectionCarsCollection,
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return new Response(
        JSON.stringify({ error: "No data found for 'Collection Cars Data'" }),
        { status: 404 }
      );
    }

    const data = snapshot.docs[0].data();
    const id = snapshot.docs[0].id; // Include document ID for updates or deletions
    return new Response(JSON.stringify({ id, ...data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// POST Request: Add new "Collection Cars Data" entry
export async function POST(req) {
  try {
    const collectionCarsData = await req.json();

    // Validate data with Yup
    await CollectionCarsSchema.validate(collectionCarsData, {
      abortEarly: false,
    });

    const collectionCarsCollection = collection(db, "collectionCarsData");
    await addDoc(collectionCarsCollection, {
      ...collectionCarsData,
      createdAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "'Collection Cars Data' saved successfully" }),
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

// PUT Request: Update an existing "Collection Cars Data" entry by ID
export async function PUT(req) {
  try {
    const { id, ...collectionCarsData } = await req.json();

    // Validate data with Yup
    await CollectionCarsSchema.validate(collectionCarsData, {
      abortEarly: false,
    });

    const collectionCarsDoc = doc(db, "collectionCarsData", id);
    await updateDoc(collectionCarsDoc, {
      ...collectionCarsData,
      updatedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        message: "'Collection Cars Data' updated successfully",
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

// DELETE Request: Delete a "Collection Cars Data" entry by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const collectionCarsDoc = doc(db, "collectionCarsData", id);
    await deleteDoc(collectionCarsDoc);

    return new Response(
      JSON.stringify({
        message: "'Collection Cars Data' deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
