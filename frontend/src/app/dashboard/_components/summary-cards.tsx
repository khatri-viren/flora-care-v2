"use client";
import { Droplets, Sun, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";

const SummaryCards = ({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: any;
}) => {
  const { user } = useUser();
  return (
    <>
      <div className="flex">
        <h1 className="text-2xl text-primary font-semibold font-zodiak">
          Welcome back, {user?.firstName} {user?.lastName}
        </h1>
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-5">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PH</CardTitle>
            {/* <Thermometer className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-6 w-full my-1" />
            ) : (
              <div className="text-2xl font-bold">
                {Number(data.pH).toFixed(2)} ph
              </div>
            )}
            <p className="text-xs text-muted-foreground">of the water</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TDS</CardTitle>
            {/* <Landmark className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-6 w-full my-1" />
            ) : (
              <div className="text-2xl font-bold">
                {Number(data.tds).toFixed(2)} ppm
              </div>
            )}
            <p className="text-xs text-muted-foreground">of the water</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-6 w-full my-1" />
            ) : (
              <div className="text-2xl font-bold">
                {Number(data.temperature).toFixed(2)} °C
              </div>
            )}
            {/* <Progress className="h-2 my-1" /> */}
            <p className="text-xs text-muted-foreground">of air</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Humidity</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-6 w-full my-1" />
            ) : (
              <div className="text-2xl font-bold">{data.humidity} %</div>
            )}
            {/* <Progress className="h-2 my-1" /> */}
            <p className="text-xs text-muted-foreground">in the air</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">UV Light</CardTitle>
            <Sun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-6 w-full my-1" />
            ) : (
              <div className="text-2xl font-bold">{data.UVS} µW/m²</div>
            )}
            {/* <Progress className="h-2 my-1" /> */}
            <p className="text-xs text-muted-foreground">available</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SummaryCards;
