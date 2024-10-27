"use client";

import React, { useState, useEffect } from "react";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

const MonthlySalesChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/chart");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setChartData(data);
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales</CardTitle>
          <CardContent className="min-h-[200px] w-full h-full pt-6">
            <div className="flex flex-col justify-center space-y-3">
              <Skeleton className="h-[180px] w-[300px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-[250px]" />
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-6 w-[250px]" />
                <Skeleton className="h-6 w-[200px]" />
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    );
  }

  console.log(chartData);

  const chartConfig = {
    sales: {
      label: "Sales",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Sales</CardTitle>
        <CardContent className="pt-4">
          <ChartContainer config={chartConfig} className="w-full min-h-[200px]">
            <BarChart accessibilityLayer data={chartData}>
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                dataKey="sales"
                tickLine={true}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="sales" fill="#000" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default MonthlySalesChart;
