import Link from "next/link";
import React from "react";
import { IResourceFull } from "~/interfaces/resource";

const CardResource = ({ resource }: { resource: IResourceFull }) => {
  return (
    <div className="md:min-h-42 group overflow-hidden rounded-lg bg-white shadow-md hover:-translate-y-2 dark:bg-dark-ele">
      <Link href={resource.url} target="_blank" className="">
        <div className="flex h-full flex-col pb-4">
          <div className="flex">
            <h2 className="mb-2 mt-2 flex-1 truncate pl-4 text-xl font-semibold group-hover:text-purple-500">
              {resource.title}
            </h2>
            <div className="w-fit">
              <p className="rounded-bl-lg bg-gradient-to-br from-violet-400 to-pink-400 px-2 py-1 text-[12px] font-semibold uppercase tracking-wider text-white">
                {resource.type}
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between px-4">
            <p className="mb-2">{resource.description}</p>
            <div className="">
              {resource.categories.map((item) => (
                <span
                  key={item._id}
                  className="inline-block rounded-full bg-blue-light px-2 py-1 text-xs dark:bg-black-2 [&:not(:last-child)]:mr-2"
                >
                  #{item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardResource;
