"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

import { AwardIcon } from "lucide-react";

import { ITopCategoryData } from "@/types/interface";

type Props = {
  heading: string;
};

const TopCategoryMetrics = ({ heading }: Props) => {
  const [topCategory, setTopCategory] = useState<ITopCategoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopCategory = async () => {
      try {
        const response = await axios.get("/api/top-category");
        const data: ITopCategoryData = response.data;
        setTopCategory(data);
      } catch (err) {
        console.error("Error fetching top category data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopCategory();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center mt-5 gap-y-4">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-sm font-medium">{heading}</h2>
              <AwardIcon className="text-gray-500 w-4 h-4" />
            </div>
            <div className="pt-1 w-full space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-start justify-center w-full mt-5">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-sm font-medium">{heading}</h2>
            <AwardIcon className="text-gray-500 w-4 h-4" />
          </div>
          <p className="text-2xl font-bold mt-2">{topCategory?.category}</p>
          <p className="text-gray-400 text-xs">
            Total +{topCategory?.totalSold} items sold
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCategoryMetrics;
