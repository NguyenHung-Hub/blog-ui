import Link from "next/link";
import React from "react";
import AvatarText from "../Avatar/AvatarText";

const UserDropdown = ({ text }: { text: string }) => {
  return (
    <div className="group relative">
      <AvatarText
        text={text}
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
        <Link
          href={"/logout"}
          className="mt-4 block w-full rounded border border-gray-500 px-3 py-1 text-center"
        >
          Đăng xuất
        </Link>
      </div>
    </div>
  );
};

export default UserDropdown;
