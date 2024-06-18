"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "~/store";
import { fetchUser } from "~/store/reducer/user";
import { ILoginReq } from "~/interfaces/user";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state) => state.user);

  const [form, setForm] = useState<ILoginReq>({ email: "", password: "" });

  const router = useRouter();

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (userStore.isAuth) {
      router.push("/");
      console.log("login success");
    } else {
      console.log("login error");
    }
  }, [userStore.isAuth, router]);

  function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    console.log("login...");

    dispatch(fetchUser(form));
  }

  return (
    <div className="f-center relative h-screen w-full">
      <Image
        src={"/bg.jpg"}
        width={3000}
        height={2000}
        className="absolute inset-0 z-10 h-full w-full object-cover"
        alt="Background login page"
      />
      <div className="f-center fixed inset-0 z-20 bg-slate-800/40 backdrop-blur-sm"></div>
      <div className="f-center absolute z-40 min-w-fit overflow-hidden rounded-md bg-white shadow-md">
        <div className="hidden h-[300px] w-[300px] md:block md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]">
          <Image
            src={"/login.webp"}
            width={500}
            height={500}
            className="h-full w-full object-cover"
            alt="Image"
          />
        </div>
        <div className="f-center h-[300px] w-[300px] p-12 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px] lg:p-16">
          <div className="w-full">
            <h1 className="mb-6 text-24 font-semibold text-slate-700">
              Login Account
            </h1>
            <Input title="Email" name="email" onChange={onChangeInput} />
            <Input
              title="Password"
              name="password"
              className="mt-4"
              onChange={onChangeInput}
            />
            <Button
              primary
              rounded
              className="mt-6 w-full"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
