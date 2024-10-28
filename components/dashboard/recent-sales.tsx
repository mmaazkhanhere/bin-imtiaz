"use client";

import React, { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IRecentSales } from "@/types/interface";
import { Skeleton } from "../ui/skeleton";

const RecentSales = () => {
  const [recentSales, setRecentSales] = useState<IRecentSales[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecentSales = async () => {
      setIsLoading(true);
      const response = await fetch("/api/recent-sales");
      const data = await response.json();
      setRecentSales(data);
      setIsLoading(false);
    };
    fetchRecentSales();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales</CardTitle>
          <CardContent className="min-h-[200px] w-full h-full pt-6">
            <div className="flex flex-col items-end justify-center space-y-3">
              <Skeleton className="h-[180px] w-[400px] rounded-xl" />
              <div className="space-y-2 flex flex-col items-end">
                <Skeleton className="h-6 w-[450px]" />
                <Skeleton className="h-6 w-[400px]" />
                <Skeleton className="h-6 w-[450px]" />
                <Skeleton className="h-6 w-[400px]" />
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardContent>
          <div className="flex flex-col gap-8 pt-4">
            {recentSales.map((sale) => (
              <article
                key={sale.id}
                className="flex items-center justify-between w-full"
              >
                <div className="flex flex-col items-start gap-y-1">
                  <p className="font-medium">{sale.productName}</p>
                  <p className="text-xs text-gray-600">{sale.seller}</p>
                </div>
                <p className="font-bold">+Rs{sale.price}</p>
              </article>
            ))}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default RecentSales;
