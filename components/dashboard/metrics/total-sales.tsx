"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

import { calculatePercentageChange } from "@/helpers/calculatePercentageChange";

import { CreditCard } from "lucide-react";

type Props = {
  heading: string;
};

const TotalSalesMetrics = ({ heading }: Props) => {
  const [currentSales, setCurrentSales] = useState<number>(0);
  const [previousSales, setPreviousSales] = useState<number>(0);
  const [percentageChange, setPercentageChange] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get("/api/monthly-sales");
        const { currentSales, previousSales } = response.data;

        setCurrentSales(currentSales);
        setPreviousSales(previousSales);

        const change = calculatePercentageChange(currentSales, previousSales);
        setPercentageChange(change);
      } catch (err) {
        console.error("Error fetching revenue data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center mt-5 gap-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const isPositive = percentageChange !== null && percentageChange >= 0;
  const changeColor = isPositive ? "text-green-500" : "text-red-500";
  const changeSign = isPositive ? "+" : "";

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-start justify-center w-full mt-5">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-sm font-medium">{heading}</h2>
            <CreditCard className="text-gray-500 w-4 h-4" />
          </div>
          {percentageChange == null ? (
            <p className="text-2xl font-bold mt-2">+{currentSales}</p>
          ) : (
            <p className="text-2xl font-bold mt-2">
              {changeSign}
              {currentSales}
            </p>
          )}

          {percentageChange !== null ? (
            <p className={`text-xs ${changeColor}`}>
              {changeSign}
              {percentageChange.toFixed(2)}% from last month
            </p>
          ) : (
            <p className="text-xs text-gray-400">
              No previous data to compare.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalSalesMetrics;
