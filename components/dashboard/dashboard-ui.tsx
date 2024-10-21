import React from 'react'
import Metrics from './metrics/metrics'

const DashboardUI = () => {
  return (
    <section className='flex flex-col'>
        <h1 className='py-8 text-2xl font-bold'>Dashboard</h1>

        <Metrics />
    </section>
  )
}

export default DashboardUI