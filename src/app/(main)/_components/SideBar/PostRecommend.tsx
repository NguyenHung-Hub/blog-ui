import Image from "next/image";
import Link from "next/link";
import React from "react";
import PlayIcon from "~/components/Icons/PlayIcon";
import cfg from "~/config";

interface IPostRecommend {
  title: string;
  slug: string;
}

const PostRecommend = ({ title, slug }: IPostRecommend) => {
  return (
    <section className="my-3">
      <Link href={`${cfg.routes.post}/${slug}`}>
        <div className="group flex">
          <div className="mt-1 h-4 w-4">
            <PlayIcon className="h-4 w-4 group-hover:text-blue-1" />
          </div>
          <h4 className="line-clamp-2 px-1 text-base group-hover:text-blue-1">
            {title}
          </h4>
        </div>
      </Link>
    </section>
  );
};

export default PostRecommend;
