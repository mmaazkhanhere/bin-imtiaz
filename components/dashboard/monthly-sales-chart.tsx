"use client"

import React from 'react'

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const MonthlySalesChart = () => {

    const chartData = [
        { month: "January", sales: 45000},
        { month: "February", sales: 60000},
        { month: "March", sales: 22000},
        { month: "April", sales: 43000 },
        { month: "May", sales: 19000},
        { month: "June", sales: 21000},
        { month: "July", sales: 33000},
        { month: "August", sales: 28000},
        { month: "September", sales: 41000},
        { month: "October", sales: 27000},
        { month: "November", sales: 26500},
        { month: "December", sales: 14000},
      ];

      const chartConfig = {
        sales: {
          label: "Sales",
          color: "#2563eb",
        },
      } satisfies ChartConfig
      

  return (
    <Card>
        <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
            <CardContent className='pt-4'>
                <ChartContainer config={chartConfig} className='w-full min-h-[200px]'>
                    <BarChart accessibilityLayer data={chartData}>
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
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
    
  )
}

export default MonthlySalesChart