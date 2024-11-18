import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { app } from "@/lib/firebase";
import {
  deleteDoc,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export async function POST(req: Request) {
  const db = getFirestore(app);
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new Response(
      "You need to set the WEBHOOK_SECRET environment variable",
      {
        status: 400,
      }
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  //   console.log("Error verifying webhook:", typeof req);
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  if (!id) return new Response("User ID not found", { status: 400 });
  if (eventType === "user.created") {
    const userRef = doc(db, "users", id);
    await setDoc(
      userRef,
      {
        id,
        firstName: evt.data.first_name,
        lastName: evt.data.last_name,
        email: evt.data.email_addresses[0].email_address,
        deviceIds: [],
        createdAt: evt.data.created_at,
        updatedAt: evt.data.updated_at,
      },
      { merge: true }
    );
    console.log("User created successfully");
  } else if (eventType === "user.updated") {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      firstName: evt.data.first_name,
      lastName: evt.data.last_name,
      email: evt.data.email_addresses[0].email_address,
      updatedAt: evt.data.updated_at,
    });
    console.log("User updated successfully");
  } else if (eventType === "user.deleted") {
    const userRef = doc(db, "users", id);
    await deleteDoc(userRef);
    console.log("User deleted successfully");
  }
  return new Response("Webhook handled successfully", { status: 200 });
}
