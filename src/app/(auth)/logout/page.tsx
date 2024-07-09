"use client";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "~/store";
import { logout } from "~/store/reducer/user";
import LoadingPage from "~/components/Loading/LoadingPage";

const LogoutPage = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  useEffect(() => {
    dispatch(logout());

    localStorage.removeItem("user");
    Cookies.remove("access_token");
    Cookies.remove("session_id");
    router.replace("/");
    router.refresh();
  }, []);

  return (
    <div>
      <LoadingPage />
    </div>
  );
};

export default LogoutPage;
