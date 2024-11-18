import { app } from "@/lib/firebase";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

// This is the correct way to handle POST requests in Next.js API routes (App Router)
export async function POST(req: Request) {
  const db = getFirestore(app);

  try {
    // Parse the request body
    const { token, userId } = await req.json(); // Properly parse the JSON body

    if (!token || !userId) {
      return new Response(
        JSON.stringify({ error: "Token and userId are required." }),
        { status: 400 }
      );
    }

    // Reference the user's document in Firestore
    const userRef = doc(db, `users/${userId}`);

    // Update the document with the FCM token
    await updateDoc(userRef, { fcmToken: token });

    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error("Error updating FCM token:", error);
    return new Response("Failed to update token", { status: 500 });
  }
}
