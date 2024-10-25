import { Sales } from '@/types/interface'
import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'

const sale: Sales[] = [
  {
      id: '1abc34',
      productName: 'White Cap',
      price: 600,
      quantity: 2,
      seller: 'Muhammed Ali',
      category: 'Fleece',
      color: 'White',
      date: '25 October 2024'
  },
  {
      id: '2abc34',
      productName: 'Black Cap',
      price: 2000,
      quantity: 8,
      seller: 'Muhammed Ali',
      category: 'Fleece',
      color: 'Black',
      date: '25 October 2024'
  },
  {
    id: '2abc34',
      productName: 'Gray Cap',
      price: 1400,
      quantity: 3,
      seller: 'Noman Khan',
      category: 'Fleece',
      color: 'Gray',
      date: '28 October 2024'
  }

]

const SalesDetail = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <h1 className='text-3xl font-semibold py-16 text-center'>Sales Details</h1>
      <DataTable columns={columns} data={sale} />
    </div>
  )
}

export default SalesDetail