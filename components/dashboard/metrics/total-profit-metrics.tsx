"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { calculatePercentageChange } from "@/helpers/calculatePercentageChange";

import { ITotalProfit } from "@/types/interface";

import { CreditCard } from "lucide-react";

type Props = {
  heading: string;
};

const TotalProfitMetrics = ({ heading }: Props) => {
  const [currentProfit, setCurrentProfit] = useState<number>(0);
  const [previousProfit, setPreviousProfit] = useState<number>(0);
  const [percentageChange, setPercentageChange] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfitData = async () => {
      try {
        const response = await axios.get("/api/monthly-profit");
        const data: ITotalProfit = response.data;
        setCurrentProfit(data.currentProfit);
        setPreviousProfit(data.previousProfit);
        const change = calculatePercentageChange(
          data.currentProfit,
          data.previousProfit
        );
        setPercentageChange(change);
      } catch (err) {
        console.error("Error fetching profit data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfitData();
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
          <p className="text-2xl font-bold mt-2">
            Rs {currentProfit.toLocaleString()}
          </p>
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

export default TotalProfitMetrics;
