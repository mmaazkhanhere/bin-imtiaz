import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo.jpg"
        width={80}
        height={80}
        alt="logo"
        className="rounded-full object-cover w-16 md:w-20 h-16 md:h-20"
      />
    </Link>
  );
};

export default Logo;
