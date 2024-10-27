"use client"

import React from 'react'
import clsx from 'clsx'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
    label: string;
    href: string;
}

const NavigationItem = ({label, href}: Props) => {

   const pathname = usePathname();
   const router = useRouter();

   const isActive = pathname === href

   const handleNavigation = () => {
     router.push(href);
   }

  return (
    <button
    className={clsx(
        'p-2 text-sm font-medium',
        isActive ? "bg-white text-black rounded-lg" : "text-gray-400 "
    )}
    onClick={handleNavigation}
    >
        {label}
    </button>
  )
}

export default NavigationItem