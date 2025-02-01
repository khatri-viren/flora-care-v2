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

const Dashboard = () => {
  const queryClient = useQueryClient();
  const { isLoaded, userId } = useAuth();
  const [deviceId, setDeviceId] = useState("");

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

    socket.on("connect", () => console.log("Connected to WebSocket server"));
    socket.on("update", (newData) => {
      //   console.log(newData);
      queryClient.setQueryData(["dataKey", deviceId], (oldData: any) => {
        return [...(oldData || []), newData];
      });
    });
    socket.on("disconnect", () =>
      console.log("Disconnected from WebSocket server")
    );

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
      uvLightData: transformData(data, "UVS"),
      phData: transformData(data, "pH"),
    };
  }, [data]);

  return (
    <>
      <SummaryCards isLoading={isLoading} data={summaryData} />
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
          data={chartData.uvLightData}
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
