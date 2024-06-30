"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import AppIcon from "~/components/Icons/AppIcon";
import BrowserIcon from "~/components/Icons/BrowserIcon";
import LayerIcon from "~/components/Icons/LayerIcon";
import LayoutIcon from "~/components/Icons/LayoutIcon";
import cfg from "~/config";

const SideBarDashboard = () => {
  const pathname = usePathname();

  const sidebarData = [
    {
      name: "Dashboard",
      path: cfg.routes.dashboard,
      icon: AppIcon,
    },
    {
      name: "Post",
      path: cfg.routes.postDashboard,
      icon: BrowserIcon,
    },
    {
      name: "Resource",
      path: cfg.routes.resourceDashboard,
      icon: LayerIcon,
    },
    {
      name: "Profile",
      path: cfg.routes.profileDashboard,
      icon: LayoutIcon,
    },
  ];
  return (
    <aside className="h-full w-60 min-w-[200px] border-r border-gray-200">
      <div className="p-8">
        <section className="f-center">
          <Image
            src={"/svg/logo-text.svg"}
            height={60}
            width={147}
            priority={true}
            className="h-[60px] w-[147px]"
            alt="logo text"
          />
        </section>
        <section className="mt-8">
          <ul>
            {sidebarData.map((s, i) => {
              const Icon = s.icon;
              return (
                <li className="mb-2" key={i}>
                  <Link href={s.path} className="">
                    <div
                      className={`flex items-center rounded px-4 py-2 transition duration-150 ease-in-out hover:scale-105 hover:bg-primary hover:text-white ${pathname == s.path ? "bg-primary text-white" : "bg-transparent"}`}
                    >
                      <div className="mr-3">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-base font-semibold leading-6">
                        {s.name}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </aside>
  );
};

export default SideBarDashboard;
