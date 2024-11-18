import { db } from "../config/firebase.js";
import { getUserFcmToken } from "../fcm-messaging/get-token.js";
import { sendPumpLogNotification } from "../fcm-messaging/send-pump-msg.js";
import { io } from "../server.js";
import mqttClient from "./client.js";

export const handleDeviceDiscovery = async (topic, data) => {
  const deviceId = topic.split("/").pop();
  const { email } = data;
  try {
    const ordersRef = db.collection("orders");
    const query = ordersRef
      .where("userEmail", "==", email)
      .where("deviceId", "==", deviceId);
    const querySnapshot = await query.get();

    if (!querySnapshot.empty) {
      const orderDoc = querySnapshot.docs[0];
      const userId = orderDoc.data().userId;

      await db
        .collection("devices")
        .doc(deviceId)
        .set({ userEmail: email, userId: userId }, { merge: true });

      mqttClient.publish(`devices/${deviceId}/command`, "STOP_DISCOVERY");
      console.log(`Device ${deviceId} added for user ${email}`);
    } else {
      console.log(
        `No matching order found for email ${email} and device ${deviceId}`
      );
    }
  } catch (error) {
    console.error("Error processing discovery message:", error);
  }
};

export const handleOtherMessages = async (message) => {
  let data;

  // Try to parse the message as JSON
  try {
    if (typeof message === "object") {
      data = message;
    } else {
      data = JSON.parse(message);
    }
  } catch (error) {
    console.error("Received message is not valid JSON:", message.toString());
    return;
  }

  try {
    const { userEmail, deviceId, type } = data;
    const timestamp = new Date();

    const userQuery = await db
      .collection("users")
      .where("email", "==", userEmail)
      .get();

    if (!userQuery.empty) {
      const userDoc = userQuery.docs[0];
      const userId = userDoc.id;

      let deviceDataRef = db.collection(
        `users/${userId}/devices/${deviceId}/data`
      );

      if (type === "pump-log") {
        deviceDataRef = db.collection(
          `users/${userId}/devices/${deviceId}/pumpLogs`
        );

        // Get FCM token for the specific user
        const userFcmToken = await getUserFcmToken(userId);

        // Send notification
        await sendPumpLogNotification(userFcmToken, { ...data, timestamp });
      }

      const dataDoc = await deviceDataRef.add({
        ...data,
        timestamp,
      });
      const dataId = dataDoc.id;

      console.log(`Data added to Firestore with ID: ${dataId}`);

      // Broadcast the new data to the specific room (userId + deviceId)
      const roomName = `${userId}-${deviceId}`;
      try {
        if (type !== "pump-log") {
          io.to(roomName).emit("update", data); // Emit to the specific room
        } else {
          //   console.log("Pump log");
        }
      } catch (error) {
        console.error("Error broadcasting data to Socket.IO:", error);
      }
    } else {
      console.error("No user found with email:", userEmail);
    }
  } catch (error) {
    console.error("Error storing data in Firestore:", error);
  }
};
