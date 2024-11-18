"use client";
import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { app } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");
  const { userId } = useAuth();

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (!userId) return;
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessaging(app);

          // Request notification permission
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            });

            if (currentToken) {
              setToken(currentToken);

              // Send the currentToken (FCM token) to the backend
              await fetch("/api/save-fcm-token", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  token: currentToken, // Use the currentToken instead of state token
                  userId,
                }),
              });
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          }
        }
      } catch (error) {
        console.log("Error retrieving token:", error);
      }
    };

    retrieveToken();
  }, [userId]); // Include userId in the dependency array

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
