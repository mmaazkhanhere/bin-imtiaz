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

   const isActive = pathname.includes(href);

   const handleNavigation = () => {
     router.push(href);
   }

  return (
    <button
    className={clsx(
        'p-2 text-sm',
        isActive ? "bg-white text-black rounded-lg font-semibold" : "text-gray-400 font-medium"
    )}
    onClick={handleNavigation}
    >
        {label}
    </button>
  )
}

export default NavigationItem