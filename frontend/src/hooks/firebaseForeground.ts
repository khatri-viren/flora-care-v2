"use client";
import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import useFcmToken from "@/hooks/useFCMToken";
import { app } from "../lib/firebase";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

export default function FcmTokenComp() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(app);
        const unsubscribe = onMessage(messaging, (payload) => {
          console.log("Foreground push notification received:", payload);
          toast.info(payload.data!.body);
        });
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event on cleanup
        };
      }
    }
  }, [notificationPermissionStatus, userId]);

  return null; // This component is primarily for handling foreground notifications
}
