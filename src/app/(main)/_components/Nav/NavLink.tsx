import Link from "next/link";
import React from "react";

const NavLink = ({
  title,
  href,
  className = "",
}: {
  title: string;
  href: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={`f-center m-1 p-1 font-semibold text-gray-700 hover:text-primary dark:text-gray-400 hover:dark:text-primary ${className}`}
    >
      <span>{title}</span>
    </Link>
  );
};

export default NavLink;
