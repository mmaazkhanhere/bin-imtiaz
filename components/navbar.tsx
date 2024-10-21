import React from 'react'
import Logo from './logo'
import NavigationMenu from './navigation-menu'
import { UserButton } from '@clerk/nextjs'


const Navbar = () => {
  return (
    <header className='flex items-center justify-between w-full px-2 py-4'>
        <div className='flex items-center gap-x-8'>
            <Logo />
            <NavigationMenu/>
        </div>

        <UserButton />
    </header>
  )
}

export default Navbar