"use client";
import React, { useEffect, useState } from "react";
import ThemeToggle from "../ThemeToggle";
import useDisableScroll from "~/hook/useDisableScroll";
import NavLink from "./NavLink";
import MenuIcon from "~/components/Icons/MenuIcon";
import CrossIcon from "~/components/Icons/CrossIcon";
import { useAppSelector } from "~/store";

const NavMobile = () => {
  const user = useAppSelector((state) => state.user);
  const [toggleMenu, setToggleMenuMobile] = useState(false);

  const { setDisableScroll } = useDisableScroll();
  useEffect(() => {
    setDisableScroll(toggleMenu);
  }, [toggleMenu]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative block md:hidden">
      <div
        className={`absolute right-0 top-0 h-screen w-screen bg-white/50 backdrop-blur-sm ${toggleMenu ? "block" : "hidden"}`}
      ></div>
      <div className="relative">
        <div onClick={() => setToggleMenuMobile(!toggleMenu)}>
          <MenuIcon className="h-8 w-8 text-gray-500 dark:text-gray-300" />
        </div>

        <div
          className={`${toggleMenu ? "" : "translate-x-full"} absolute -right-4 -top-4 h-screen w-72 bg-slate-300 p-4 dark:bg-dark`}
        >
          <div className="flex justify-end">
            <div onClick={() => setToggleMenuMobile(!toggleMenu)}>
              <CrossIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center">
              <NavLink title="Trang chủ" href="/" />
              <NavLink title="Tài nguyên" href="/resources" />
            </div>

            <div className="fc-center mt-4">
              <ThemeToggle
                title
                className="w-40 rounded border border-gray-500 px-4 py-2"
              />
              {isMounted && (
                <NavLink
                  title={user.isAuth ? "Đăng xuất" : "Đăng nhập"}
                  href={user.isAuth ? "/logout" : "/dang-nhap"}
                  className="mt-4 h-10 w-40 rounded border border-gray-500 px-4 py-1"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMobile;
