import { msg } from "../config/firebase.js";
import { convertFirestoreTimestampToDate } from "../utils.js";

export async function sendPumpLogNotification(userFcmToken, pumpLogData) {
  if (!userFcmToken) {
    console.error("No FCM token found for user.");
    return;
  }

  const message = {
    token: userFcmToken, // FCM token of the user
    notification: {
      title: `Pump ${pumpLogData.status ? "Triggered ON" : "Triggered OFF"}`,
      body: `Pump ${
        pumpLogData.status ? "turned ON" : "turned OFF"
      } at ${convertFirestoreTimestampToDate(
        pumpLogData.timestamp
      ).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true, // or false depending on if you want 12-hour or 24-hour format
      })}`,
    },
    data: {
      deviceId: pumpLogData.deviceId,
      pumpStatus: pumpLogData.status ? "Triggered ON" : "Triggered OFF", // Custom data for pump status
    },
  };

  try {
    const response = await msg.send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error("Error sending message:", error.message);
  }
}
