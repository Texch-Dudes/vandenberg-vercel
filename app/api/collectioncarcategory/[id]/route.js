import { db } from "@/app/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const categoryDoc = doc(db, "categories", id);
    const categorySnapshot = await getDoc(categoryDoc);

    if (!categorySnapshot.exists()) {
      return new Response(
        JSON.stringify({ error: "Category not found" }),
        { status: 404 }
      );
    }

    const data = categorySnapshot.data();
    return new Response(
      JSON.stringify({
        databaseId: id,
        name: data.name,
        count: data.count || null,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
