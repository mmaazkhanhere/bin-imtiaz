"use client";

import React, { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IRecentSales } from "@/types/interface";

const recentSales = [
  {
    id: 1,
    item: "Fleece Cap Black Color",
    by: "Muhammed Ali",
    amount: 1999.0,
  },
  {
    id: 2,
    item: "Fleece Cap Black Color",
    by: "Muhammed Ali",
    amount: 39.0,
  },
  {
    id: 3,
    item: "Fleece Cap Black Color",
    by: "Muhammed Ali",
    amount: 299.0,
  },
  {
    id: 4,
    item: "Fleece Cap Black Color",
    by: "Muhammed Ali",
    amount: 990.0,
  },
  {
    id: 5,
    item: "Fleece Cap Black Color",
    by: "Muhammed Ali",
    amount: 39.0,
  },
];

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
