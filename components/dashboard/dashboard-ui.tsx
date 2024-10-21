import React from 'react'
import Metrics from './metrics/metrics'
import MonthlySalesChart from './monthly-sales-chart'

const DashboardUI = () => {
  return (
    <section className='flex flex-col'>
        <h1 className='py-8 text-2xl font-bold'>Dashboard</h1>

        <Metrics />

        <div className='grid grid-cols-9 w-full pt-8 gap-x-8'>
            <div className='col-span-5 w-full'>
                <MonthlySalesChart />
            </div>
            <div className='col-span-4 w-full'>
                <MonthlySalesChart />
            </div>
        </div>
    </section>
  )
}

export default DashboardUI