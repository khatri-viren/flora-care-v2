import { db } from "../config/firebase.js";

export async function getUserFcmToken(userId) {
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();

  if (userDoc.exists && userDoc.data().fcmToken) {
    return userDoc.data().fcmToken;
  } else {
    console.log("No FCM token found for user:", userId);
    return null;
  }
}
