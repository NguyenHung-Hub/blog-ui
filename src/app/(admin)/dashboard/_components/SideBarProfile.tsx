"use client";
import React, { useState } from "react";
import Button from "~/components/Button/Button";
import AvatarText from "~/app/(main)/_components/Avatar/AvatarText";
import { useAppSelector } from "~/store";

const SideBarProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useAppSelector((state) => state.user);
  return (
    <div className="col-span-3 h-full min-w-[200px] border-r border-gray-200">
      <div className="flex h-full flex-col items-center px-4">
        <AvatarText text="H" size={180} className="my-4" />

        <div className="flex w-full justify-start font-semibold text-gray-600">
          <span className="w-24">Username:</span>
          <span className="ml-2">{user.user.username}</span>
        </div>
        <div className="flex w-full justify-start font-semibold text-gray-600">
          <span className="w-24">Email:</span>
          <span className="ml-2">{user.user.email}</span>
        </div>
        <div className="flex w-full justify-start font-semibold text-gray-600">
          <span className="w-24">Phone:</span>
          <span className="ml-2">None</span>
        </div>

        <div className="mt-6 flex w-full flex-col">
          <Button outline primary rounded className="my-1 text-primary">
            Change password
          </Button>
          <Button
            outline
            primary
            rounded
            className="my-1 text-primary"
            onClick={() => setShowModal(true)}
          >
            Edit profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBarProfile;
