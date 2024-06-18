import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeaderRight from "./HeaderRight";
import Search from "./Search";

const Header = () => {
  return (
    <header className="p-responsive fixed left-0 right-0 top-0 z-[100] flex h-14 w-full items-center justify-between border-b border-b-gray-200 bg-white dark:border-b-gray-700 dark:bg-dark">
      <Link href={"/"}>
        <Image
          src="/logo-h.png"
          alt="Husir Blog Logo"
          width={36}
          height={36}
          priority={true}
          className="h-6 w-6 md:h-9 md:w-9"
        />
      </Link>
      <Search />
      <HeaderRight />
    </header>
  );
};

export default Header;
