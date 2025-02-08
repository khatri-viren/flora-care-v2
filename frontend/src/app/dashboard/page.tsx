"use client";
import React, { useEffect, useMemo, useState } from "react";
import SummaryCards from "./_components/summary-cards";
import LineChartCard from "./_components/cards/line-chart-card";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import db from "@/lib/firebase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import io from "socket.io-client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const { isLoaded, userId } = useAuth();
  const [deviceId, setDeviceId] = useState("");
  const [commandStatus, setCommandStatus] = useState(""); // To display command status
  const [waterPumpStatus, setWaterPumpStatus] = useState<boolean | null>(null); // State for water pump status
  const [nutrientPumpStatus, setNutrientPumpStatus] = useState<boolean | null>(
    null
  ); // State for nutrient pump status
  const [isStatusLoading, setIsStatusLoading] = useState(false); // Indicate status loading

  const fetchData = async () => {
    const userRef = doc(db, `users/${userId}`);
    const snapshot = await getDoc(userRef);
    const user = snapshot.data();
    // console.log("User details: ", user, userId);
    if (!user || !user.deviceIds || user.deviceIds.length === 0) return [];

    const device = user.deviceIds[0];
    setDeviceId(device);

    const dataRef = collection(db, `users/${userId}/devices/${device}/data`);
    const orderedQuery = query(
      dataRef,
      orderBy("timestamp", "desc"),
      limit(30)
    );

    const snapshots = await getDocs(orderedQuery);
    return snapshots.docs.map((doc) => doc.data());
  };

  useEffect(() => {
    if (!userId) return;

    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "", {
      query: { userId, deviceId },
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      //   handlePumpCommand("request_status");
    });
    socket.on("update", (newData) => {
      //   console.log(newData);
      if (newData.type === "status-response") {
        // Handle status response
        setWaterPumpStatus(newData.waterPumpStatus);
        setNutrientPumpStatus(newData.nutrientPumpStatus);
        console.log("Status updated via WebSocket:", newData); // Log status updates
      } else {
        // Handle other data updates as before
        queryClient.setQueryData(["dataKey", deviceId], (oldData: any) => {
          return [...(oldData || []), newData];
        });
      }
    });
    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
      setIsStatusLoading(false); // Stop loading even on error
      // Optionally handle error UI - e.g., display a warning
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      setIsStatusLoading(false); // Stop loading if disconnected
      // Optionally, you might want to reset pump statuses to null or a default unknown state here
      setWaterPumpStatus(null);
      setNutrientPumpStatus(null);
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient, userId, deviceId]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["dataKey", deviceId],
    queryFn: fetchData,
  });

  const transformData = (data: any[], key: string) => {
    return data.map((item) => ({
      timestamp: item.timestamp, // Firestore timestamp conversion to JS Date
      value: item[key],
    }));
  };

  const summaryData = useMemo(() => (data.length ? data[0] : {}), [data]);

  const chartData = useMemo(() => {
    if (!data) return {};

    return {
      temperatureData: transformData(data, "temperature"),
      humidityData: transformData(data, "humidity"),
      tdsData: transformData(data, "TDS"),
      phData: transformData(data, "pH"),
    };
  }, [data]);

  const handlePumpCommand = async (command: string) => {
    if (!deviceId) {
      setCommandStatus("Device ID not set.");
      return;
    }
    try {
      setCommandStatus("Sending command...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/device/command`,
        {
          // Using a single endpoint for commands
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deviceId: deviceId, command: command }), // Include deviceId and command
        }
      );

      if (response.ok) {
        setCommandStatus(`Command "${command}" sent successfully.`);
        setTimeout(() => setCommandStatus(""), 3000); // Clear status after 3 seconds
        setTimeout(() => setCommandStatus(""), 3000);
        // Optimistically update UI immediately after sending command - can be improved with status feedback from device
        if (command === "nutrient_on") setNutrientPumpStatus(true);
        else if (command === "nutrient_off") setNutrientPumpStatus(false);
        else if (command === "water_on") setWaterPumpStatus(true);
        else if (command === "water_off") setWaterPumpStatus(false);
      } else {
        const errorData = await response.json();
        setCommandStatus(
          `Failed to send command. ${errorData?.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error sending command:", error);
      setCommandStatus("Error sending command.");
    }
  };

  const getNutrientButtonText = () => {
    if (nutrientPumpStatus === null) return "Nutrient Pump"; // Initial state
    return `Nutrient Pump: ${nutrientPumpStatus ? "ON" : "OFF"}`;
  };

  const getWaterButtonText = () => {
    if (waterPumpStatus === null) return "Water Pump"; // Initial state
    return `Water Pump: ${waterPumpStatus ? "ON" : "OFF"}`;
  };

  return (
    <>
      <SummaryCards isLoading={isLoading} data={summaryData} />
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Pump Controls</h2>
        <div className="flex space-x-2">
          <Button
            onClick={() =>
              handlePumpCommand(
                nutrientPumpStatus === true ? "nutrient_off" : "nutrient_on"
              )
            } // Correct logic
            // disabled={isStatusLoading} // Disable buttons while loading status, optional
          >
            {getNutrientButtonText()}
          </Button>
          <Button
            onClick={() =>
              handlePumpCommand(
                waterPumpStatus === true ? "water_off" : "water_on"
              )
            } // Correct logic

            // disabled={isStatusLoading} // Disable buttons while loading status, optional
          >
            {getWaterButtonText()}
          </Button>
          <Button
            onClick={() => handlePumpCommand("emergency_off")}
            variant="destructive"
          >
            Emergency Stop
          </Button>
        </div>
        {commandStatus && <p className="mt-2 text-sm">{commandStatus}</p>}
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <LineChartCard
          title="Temperature"
          description="of air"
          data={chartData.temperatureData}
        />
        <LineChartCard
          title="Humidity"
          description="in the air"
          data={chartData.humidityData}
        />
        <LineChartCard
          title="TDS"
          description="of the water"
          data={chartData.tdsData}
        />
        <LineChartCard
          title="PH"
          description="of the water"
          data={chartData.phData}
        />
      </div>
    </>
  );
};

export default Dashboard;
