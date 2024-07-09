import Image from "next/image";
import Link from "next/link";
import React from "react";
import Nav from "./Nav/Nav";
import NavMobile from "./Nav/NavMobile";

const Header = () => {
  return (
    <header className="f-center fixed left-0 right-0 top-0 z-[100] h-14 w-full border-b border-b-gray-200 bg-white dark:border-b-gray-700 dark:bg-dark">
      <div className="mx-4 flex h-full w-full items-center justify-between md:mx-0 md:w-[720px] lg:w-[960px] xl:w-1200">
        <div>
          <Link href={"/"} className="outline-none">
            <Image
              src={"/svg/logo-text.svg"}
              height={60}
              width={147}
              priority={true}
              className="h-[40px] w-[98px]"
              alt="logo text"
            />
          </Link>
        </div>
        <Nav />
        <NavMobile />
      </div>
    </header>
  );
};

export default Header;
