import React from 'react'
import { DollarSign } from 'lucide-react';

import {
    Card,
    CardContent,

  } from "@/components/ui/card"
  

type Props = {
    heading: string;
    revenue: string;
    description: string;
}

const TotalRevenueMetrics = ({heading, revenue, description}: Props) => {
  return (
    <Card>
        <CardContent>
            <div className="flex flex-col items-start justify-center w-full mt-5">
                <div className='flex items-center justify-between w-full'>
                    <h2 className='text-sm font-medium'>{heading}</h2>
                    <DollarSign className='text-gray-500 w-4 h-4' />
                </div>
                <p className='text-2xl font-bold mt-2'>${revenue}</p>
                <p className='text-gray-400 text-xs'>{description}</p>
            </div>
        </CardContent>
    </Card>
  )
}

export default TotalRevenueMetrics