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
        className="rounded-full object-cover"
      />
    </Link>
  );
};

export default Logo;
