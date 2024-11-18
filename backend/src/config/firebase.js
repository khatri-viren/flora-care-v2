import admin from "firebase-admin";
import { config } from "dotenv";
config();

const credential = process.env.FIREBASE_CREDENTIALS;

admin.initializeApp({
  credential: admin.credential.cert(credential),
});

export const db = admin.firestore();
export const msg = admin.messaging();
