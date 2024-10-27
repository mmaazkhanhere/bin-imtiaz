"use client"
import React from 'react'
import NavigationItem from './navigation-item'

const menuItems = [
    {
        label: 'Overview',
        href: '/',
    },
    {
        label: 'Inventory',
        href: '/inventory',
    },
    {
        label: 'Sales History',
        href: '/sales',
    },
]


const NavigationMenu = () => {

  return (
    <nav className='flex items-center justify-between p-1 gap-x-2 bg-gray-100 w-full rounded-lg'>
        {
            menuItems.map((menu)=>(
                <NavigationItem 
                    key={menu.href}
                    label={menu.label}
                    href={menu.href}
                />
            ))
        }
    </nav>
  )
}

export default NavigationMenu