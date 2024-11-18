import { Timestamp } from "firebase/firestore";

export type PumpLog = {
  id: string;
  timestamp: Date | { seconds: number; nanoseconds: number };
  deviceId: string;
  pumpType: string; // e.g., "water", "nutrient", etc.
  type: "pump-log"; // fixed string type for the log
  status: boolean; // true for on, false for off
  userEmail: string; // user's email who owns the device
};
