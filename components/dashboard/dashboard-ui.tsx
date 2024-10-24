import React from 'react'

import Metrics from './metrics/metrics'
import MonthlySalesChart from './monthly-sales-chart'

import { Button } from '../ui/button'

import { PlusIcon } from 'lucide-react'
import RecentSales from './recent-sales'

const DashboardUI = () => {
  return (
    <section className='flex flex-col'>
        <div className='flex items-center justify-between w-full'>
            <h1 className='py-8 text-2xl font-bold'>Dashboard</h1>

            <div className='flex items-center gap-2'>
                <Button
                    className='flex items-center gap-x-2'
                >
                    <PlusIcon/>
                    Add Inventory
                </Button>
                <Button
                    className='flex items-center gap-x-2'
                >
                <PlusIcon/>
                Add Sales
            </Button>
            </div>
            
        </div>
        
        <Metrics />

        <div className='grid grid-cols-9 w-full pt-8 gap-x-8'>
            <div className='col-span-5 w-full'>
                <MonthlySalesChart />
            </div>
            <div className='col-span-4 w-full'>
                <RecentSales />
            </div>
        </div>
    </section>
  )
}

export default DashboardUI