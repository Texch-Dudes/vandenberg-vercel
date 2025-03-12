import { db } from "@/app/lib/firebase";
import { CollectionCarCategorySchema } from "@/app/schema/collectioncarCategorySchema";
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

export async function GET() {
  try {
    const categoriesCollection = collection(db, "categories");
    const categoriesQuery = query(categoriesCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(categoriesQuery);

    if (snapshot.empty) {
      return new Response(
        JSON.stringify({
          collectionCarCategorySection: {
            nodes: [],
          },
        }),
        { status: 200 }
      );
    }

    const nodes = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        databaseId: doc.id,
        name: data.name,
        count: data.count || null, // Default to null if count isn't set
      };
    });

    return new Response(
      JSON.stringify({
        collectionCarCategorySection: {
          nodes,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name } = await req.json();

    // Check if the name already exists in the database
    const categoriesCollection = collection(db, "categories");
    const snapshot = await getDocs(categoriesCollection);

    const existingCategory = snapshot.docs.find(
      (doc) => doc.data().name.toLowerCase() === name.toLowerCase()
    );

    if (existingCategory) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Category '${name}' already exists.`,
        }),
        { status: 400 }
      );
    }

    // Validate input data using Yup
    await CollectionCarCategorySchema.validate({ name }, { abortEarly: false });

    const newCategory = {
      name,
      count: 0, // Initialize count to 0 for a new category
      createdAt: new Date().toISOString(), // Add createdAt field
    };

    const docRef = await addDoc(categoriesCollection, newCategory);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Category '${name}' created successfully.`,
        databaseId: docRef.id,
      }),
      { status: 201 }
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      return new Response(
        JSON.stringify({
          success: false,
          errors: error.errors,
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while creating the category.",
      }),
      { status: 500 }
    );
  }
}

// PUT Request: Update an existing collectionCarCategorySection entry by ID
export async function PUT(req) {
  try {
    const { id, ...categoryData } = await req.json();

    // Check if the name already exists in the database
    const categoriesCollection = collection(db, "categories");
    const snapshot = await getDocs(categoriesCollection);

    const existingCategory = snapshot.docs.find(
      (doc) => doc.data().name.toLowerCase() === categoryData.name.toLowerCase() && doc.id !== id
    );

    if (existingCategory) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Category '${categoryData.name}' already exists.`,
        }),
        { status: 400 }
      );
    }

    // Validate data with Yup
    await CollectionCarCategorySchema.validate(categoryData, {
      abortEarly: false,
    });

    const categoryDoc = doc(db, "categories", id);
    await updateDoc(categoryDoc, {
      ...categoryData,
      updatedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "Car categories updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      // Return validation errors
      return new Response(
        JSON.stringify({
          success: false,
          errors: error.errors,
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while updating car categories.",
      }),
      { status: 500 }
    );
  }
}

// DELETE Request: Delete a collectionCarCategorySection entry by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const categoryDoc = doc(db, "categories", id);
    await deleteDoc(categoryDoc);

    return new Response(
      JSON.stringify({ message: "Car categories deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}