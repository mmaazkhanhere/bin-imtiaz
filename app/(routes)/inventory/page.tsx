import { Inventory } from '@/types/interface'
import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'

const inventory: Inventory[] = [
    {
        id: "1",
        productName: "Product 1",
        category: "Category 1",
        totalStock: 100,
        stock: 50,
        price: 100,
        color: "Red"
    },
    {
        id: "2",
        productName: "Product 2",
        category: "Category 2",
        totalStock: 200,
        stock: 100,
        price: 200,
        color: "Blue"
    },
    {
        id: "3",
        productName: "Product 3",
        category: "Category 3",
        totalStock: 300,
        stock: 150,
        price: 300,
        color: "Green"
    },
    {
        id: "4",
        productName: "Product 4",
        category: "Category 4",
        totalStock: 400,
        stock: 200,
        price: 400,
        color: "Yellow"
    },
    {
        id: "5",
        productName: "Product 5",
        category: "Category 5",
        totalStock: 500,
        stock: 250,
        price: 500,
        color: "Purple"
    },
    
]

const InventoryDetailsPage = () => {
  return (
    <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-semibold py-16 text-center'>Inventory Details</h1>
        <DataTable columns={columns} data={inventory} />
    </div>
  )
}

export default InventoryDetailsPage