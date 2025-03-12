import { db } from "@/app/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { transformObject } from "@/app/lib/filterDataByLanguage";

export const runtime = "nodejs";

export async function GET(req, { params }) {

  try {
    console.log("GET request received",req);
    if (!req.url) throw new Error("Request URL is undefined");
    const { slug } = params || {};
    if (!slug) throw new Error("slug parameter is missing");

    const url = new URL(req.url);
    console.log("Query Params:", url.searchParams.toString());

    const lang = url.searchParams.get("lang") || "EN";
    const edit = url.searchParams.get("edit") === "true";

    console.log(`Fetching car with slug: ${slug}, lang: ${lang}, edit: ${edit}`);

    const carRef = doc(db, "cars", slug);
    const snapshot = await getDoc(carRef);

    if (!snapshot.exists()) {
      console.log(`Car with slug "${slug}" not found`);
      return new Response(JSON.stringify({ error: `Car with slug "${slug}" not found` }), { status: 404 });
    }

    const carData = snapshot.data();
    if (!carData) throw new Error("Car data is undefined");
    console.log("Car data fetched:", carData);

    const responseData = edit ? carData : transformObject(carData, lang);
    console.log("Response data:", responseData);

    return new Response(JSON.stringify({ data: { car: responseData } }), { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    console.log("PUT request received");
    const { slug } = params || {};
    if (!slug) throw new Error("slug parameter is missing");
    const carData = await req.json();

    console.log(`Updating car with slug: ${slug}`);

    const carRef = doc(db, "cars", slug);
    await updateDoc(carRef, carData);

    console.log("Car updated successfully");

    return new Response(JSON.stringify({ message: `Car with slug "${slug}" updated successfully` }), { status: 200 });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    console.log("DELETE request received");
    const { slug } = params || {};
    if (!slug) throw new Error("slug parameter is missing");

    console.log(`Deleting car with slug: ${slug}`);

    const carRef = doc(db, "cars", slug);
    await deleteDoc(carRef);

    console.log("Car deleted successfully");

    return new Response(JSON.stringify({ message: `Car with slug "${slug}" deleted successfully` }), { status: 200 });
  } catch (error) {
    console.error("Error in DELETE request:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
