"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { PumpLog } from "@/lib/types";
import { convertFirestoreTimestampToDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function PumpLogs() {
  const { userId } = useAuth();
  const [deviceId, setDeviceId] = useState("");

  const fetchData = async () => {
    const userRef = doc(db, `users/${userId}`);
    const snapshot = await getDoc(userRef);
    const user = snapshot.data();
    // console.log("User details: ", user, userId);
    if (!user || !user.deviceIds || user.deviceIds.length === 0) return [];

    const device = user.deviceIds[0];
    setDeviceId(device);

    const dataRef = collection(
      db,
      `users/${userId}/devices/${device}/pumpLogs`
    );
    const orderedQuery = query(
      dataRef,
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const snapshots = await getDocs(orderedQuery);
    return snapshots.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as PumpLog)
    );
  };

  const { data = [], isLoading } = useQuery({
    queryKey: ["pumpLogs", deviceId],
    queryFn: fetchData,
  });

  if (!data && !isLoading) return null;

  return (
    <Table className="md:w-3/4 mx-auto">
      <TableCaption>A list of your recent pump trigger events.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2} className="md:w-44">
            Pump Type
          </TableHead>
          <TableHead colSpan={1} className="md:w-56">
            Status
          </TableHead>
          <TableHead colSpan={2}>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data!.map((log) => (
          <TableRow key={log.id}>
            <TableCell colSpan={2} className="font-medium">
              {log.pumpType}
            </TableCell>
            <TableCell colSpan={1}>
              {log.status ? (
                <Badge variant="default">On</Badge>
              ) : (
                <Badge variant="destructive">Off</Badge>
              )}
            </TableCell>
            <TableCell colSpan={2}>
              {convertFirestoreTimestampToDate(
                log.timestamp as { seconds: number; nanoseconds: number }
              ).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
