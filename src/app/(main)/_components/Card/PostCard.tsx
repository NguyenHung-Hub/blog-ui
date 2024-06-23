import cfg from "~/config";
import formatDate from "~/util/formatDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IPost } from "~/interfaces/post";

const PostCard = (props: IPost) => {
  return (
    <section className="max-h-[260px] overflow-hidden rounded-lg bg-white hover:-translate-y-1 hover:shadow-md hover:shadow-gray-400 hover:transition dark:bg-dark-ele">
      <Link
        href={`${cfg.routes.post}/${props.slug}`}
        className="flex h-full w-full flex-col justify-between"
      >
        <div className="h-[180px] w-full overflow-hidden">
          <Image
            src={props.photo}
            width={260}
            height={180}
            alt={props.title}
            className="h-full w-full object-cover"
            sizes="10wv"
            loading="lazy"
          />
        </div>

        <div className="border-t p-2">
          <h2 className="mt-1 line-clamp-2 h-10 text-base font-bold leading-4 lg:leading-5">
            {props.title}
          </h2>
          <div className="mt-1 flex flex-col">
            <div className="ml-0.5 text-xs md:text-sm">
              {formatDate(props.createdAt)}
            </div>
            <div className="mt-0.5 flex">
              {props.categories.map((i) => (
                <div
                  key={i._id}
                  className="rounded bg-blue-light px-2 py-0.5 text-[13px] dark:bg-black-2 [&:not(:last-child)]:mr-[4px]"
                >
                  #{i.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default PostCard;
