"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/store";
import { useRouter } from "next/navigation";
import { logout } from "~/store/reducer/user";
import Cookies from "js-cookie";
import Search from "../Search";
import ThemeToggle from "../ThemeToggle";
import NavLink from "./NavLink";
import UserDropdown from "../Dropdown/UserDropdown";

const Nav = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
    dispatch(logout());

    localStorage.removeItem("user");
    Cookies.remove("access_token");
    Cookies.remove("session_id");
    router.replace("/");
    router.refresh();
  }

  useEffect(() => {
    setIsAuth(user.isAuth);
  }, [user]);

  return (
    <div>
      <div className="hidden items-center justify-end md:flex">
        <div className="flex">
          <NavLink title="Trang chủ" href="/" />
          <NavLink title="Tài nguyên" href="/resources" />
        </div>
        <div className="f-center mx-4">
          <ThemeToggle />
        </div>
        <Search />

        {isAuth && (
          <UserDropdown text={user?.user.username?.[0].toUpperCase() || "A"} />
        )}
        {!isAuth && (
          <Link
            href={"/dang-nhap"}
            className="f-center h-10 rounded border border-gray-500 px-4 py-1 text-gray-700 transition-all hover:bg-gray-600 hover:text-white dark:text-gray-400"
          >
            <span>Đăng nhập</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
