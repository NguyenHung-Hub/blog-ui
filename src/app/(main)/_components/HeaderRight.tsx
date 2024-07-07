"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/store";
import { useRouter } from "next/navigation";
import { logout } from "~/store/reducer/user";
import Cookies from "js-cookie";
import Image from "next/image";
import Button from "~/components/Button/Button";
import AvatarText from "./Avatar/AvatarText";
import ThemeToggle from "./ThemeToggle";

const HeaderRight = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [toggleMenu, setToggleMenuMobile] = useState(false);

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
    <div className="">
      <div className="relative">
        <Image
          src="/svg/menu-hamburger.svg"
          alt="Menu mobile icon"
          width={36}
          height={36}
          className="block md:hidden"
          onClick={() => setToggleMenuMobile(!toggleMenu)}
        />
      </div>

      <div
        className={`absolute right-0 top-0 rounded bg-slate-300 shadow-md ${
          toggleMenu ? "flex flex-col" : "hidden"
        } w-screen p-2 md:relative md:flex md:w-auto md:items-center md:rounded-none md:bg-transparent md:p-0 md:shadow-none`}
      >
        <div className="flex justify-end">
          <Image
            src="/svg/cross.svg"
            alt="Menu mobile icon"
            width={20}
            height={20}
            className="block md:hidden"
            onClick={() => setToggleMenuMobile(!toggleMenu)}
          />
        </div>
        <div className="mx-4">
          <Link
            href={"/"}
            className="m-1 p-1 font-semibold text-gray-500 hover:text-primary"
          >
            Trang chủ
          </Link>
          <Link
            href={"/resources"}
            className="m-1 p-1 font-semibold text-gray-500 hover:text-primary"
          >
            Tài nguyên
          </Link>
        </div>
        <ThemeToggle />
        {isAuth && (
          <div className="group relative">
            <AvatarText
              text={user?.user.username?.[0].toUpperCase() || "A"}
              type="circle"
              size={30}
              className="ml-4 cursor-pointer"
            />

            <div className="after:contents[' '] absolute -right-14 top-[calc(100%+14px)] hidden w-52 rounded bg-white p-2 drop-shadow-xl after:absolute after:bottom-full after:right-[58px] after:h-0 after:w-0 after:border-x-[12px] after:border-y-[15px] after:border-transparent after:border-b-white group-hover:block dark:bg-dark dark:drop-shadow-dark dark:after:border-b-dark">
              <Link
                href={"/dashboard"}
                className="my-1 flex cursor-pointer rounded-sm p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <img
                  className="mr-2"
                  src={"/svg/user-check.svg"}
                  alt="profile icon"
                />
                <div className="">My profile</div>
              </Link>
              <Link
                href={"/write"}
                className="my-1 flex cursor-pointer rounded-sm p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <img className="mr-2" src={"/svg/pen.svg"} alt="write icon" />
                <div className="">Write blog</div>
              </Link>
              <Button
                rounded
                outline
                primary
                small
                className="mt-4 w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
        {!isAuth && (
          <Link
            href={"/dang-nhap"}
            className="m-1 p-1 font-semibold uppercase text-gray-500 hover:text-primary"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderRight;
