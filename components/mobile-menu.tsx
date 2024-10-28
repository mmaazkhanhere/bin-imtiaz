import React from "react";
import Link from "next/link";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { AlignJustify } from "lucide-react";

import { IMenu } from "@/types/interface";

const menu: IMenu[] = [
  {
    label: "Overview",
    href: "/",
  },
  {
    label: "Inventory",
    href: "/inventory",
  },
  {
    label: "Sales History",
    href: "/sales",
  },
];

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {menu.map((item: IMenu) => (
          <Link href={item.href} key={item.href}>
            <div>{item.label}</div>
          </Link>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
