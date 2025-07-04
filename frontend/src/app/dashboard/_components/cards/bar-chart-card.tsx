"use client";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const data = [
  {
    revenue: 10400,
    subscription: 240,
  },
  {
    revenue: 14405,
    subscription: 300,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 189,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 278,
  },
  {
    revenue: 26475,
    subscription: 189,
  },
];

export default function BarChartCard() {
  const [primaryColor, setPrimaryColor] = useState("#171717");
  const { theme } = useTheme();
  useEffect(() => {
    if (theme === "dark") {
      setPrimaryColor("#ffffff");
    } else {
      setPrimaryColor("#171717");
    }
  }, [theme]);
  return (
    // <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
    //   <Card>
    //     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //       <CardTitle className="text-base font-normal">Total Revenue</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <div className="text-2xl font-bold">$15,231.89</div>
    //       <p className="text-xs text-muted-foreground">
    //         +20.1% from last month
    //       </p>
    //       <div className="h-[80px]">
    //         <ResponsiveContainer width="100%" height="100%">
    //           <LineChart
    //             data={data}
    //             margin={{
    //               top: 5,
    //               right: 10,
    //               left: 10,
    //               bottom: 0,
    //             }}
    //           >
    //             <Line
    //               type="monotone"
    //               strokeWidth={2}
    //               dataKey="revenue"
    //               activeDot={{
    //                 r: 6,
    //                 style: { fill: "var(--theme-primary)", opacity: 0.25 },
    //               }}
    //               style={
    //                 {
    //                   stroke: "black",
    //                 } as React.CSSProperties
    //               }
    //             />
    //           </LineChart>
    //         </ResponsiveContainer>
    //       </div>
    //     </CardContent>
    //   </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+2350</div>
        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
        <div className="mt-4 h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar
                dataKey="subscription"
                style={
                  {
                    fill: primaryColor,
                    opacity: 1,
                  } as React.CSSProperties
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
    // </div>
  );
}
