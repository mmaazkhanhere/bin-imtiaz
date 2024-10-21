import React from 'react'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const recentSales = [
    {
        id: 1,
        item: "Fleece Cap Black Color",
        by: "Muhammed Ali",
        amount: 1999.00,
    },
    {
        id: 2,
        item: "Fleece Cap Black Color",
        by: "Muhammed Ali",
        amount: 39.00,
    },
    {
        id: 3,
        item: "Fleece Cap Black Color",
        by: "Muhammed Ali",
        amount: 299.00,
    },
    {
        id: 4,
        item: "Fleece Cap Black Color",
        by: "Muhammed Ali",
        amount: 990.00,
    },
    {
        id: 5,
        item: "Fleece Cap Black Color",
        by: "Muhammed Ali",
        amount: 39.00,
    },
    
    
]

const RecentSales = () => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardContent>
                <div className='flex flex-col gap-8 pt-4'>
                    {
                        recentSales.map((sale)=>(
                            <article key={sale.id} className='flex items-center justify-between w-full'>
                                <div className='flex flex-col items-start gap-y-1'>
                                    <p className='font-medium'>{sale.item}</p>
                                    <p className='text-xs text-gray-600'>{sale.by}</p>
                                </div>
                                <p className='font-bold'>+Rs{sale.amount}.00</p>
                            </article>
                        ))
                    }
                </div>
            </CardContent>
        </CardHeader>
    </Card>
  )
}

export default RecentSales