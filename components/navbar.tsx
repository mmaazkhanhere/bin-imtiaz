import React from "react";
import Logo from "./logo";
import NavigationMenu from "./navigation-menu";
import { UserButton } from "@clerk/nextjs";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between w-full md:px-2 py-2 md:py-4">
      <div className="flex items-center gap-x-8">
        <Logo />
        <NavigationMenu />
      </div>

      <nav className="flex items-center gap-x-4">
        <UserButton />
        <div className="block md:hidden">
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
