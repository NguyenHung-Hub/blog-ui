import React from "react";
import PostRecommend from "./PostRecommend";
import Link from "next/link";
import { getPostRecommend } from "~/service/post";
import { getCategories } from "~/service/category";
import TableOfContent from "./TableOfContent";

const SideBarRecommend = async () => {
  const posts = await getPostRecommend(4);
  const categories = await getCategories();

  return (
    <aside className="hidden max-w-[300px] rounded-lg bg-white py-2 pl-3 text-black-1 dark:bg-dark-ele dark:text-light lg:block">
      <div className="side-bar-post sticky right-0 top-20 overflow-y-scroll">
        <TableOfContent />
        <div className="mb-8">
          <header className="mb-4 flex">
            <h3 className="text-lg font-semibold text-black-1 dark:text-light">
              {" "}
              Bài viết khác
            </h3>
            <div className="mx-2 mt-6 flex-1 border-t border-t-gray-400"></div>
          </header>
          {posts.length > 0 &&
            posts.map((i) => <PostRecommend key={i.slug} {...i} />)}
        </div>
        <div className="mb-8">
          <header className="mb-4 flex">
            <h3 className="text-lg font-semibold">Tags</h3>
            <div className="mx-2 mt-6 flex-1 border-t border-t-gray-400"></div>
          </header>
          <div className="flex h-full flex-wrap">
            {categories &&
              categories.length > 0 &&
              categories?.map((i) => (
                <Link
                  href={i.slug}
                  key={i._id}
                  className="f-center mb-2 mr-1 w-max cursor-pointer rounded-3xl border border-gray-300 px-2 py-1 text-sm text-gray-2 hover:bg-primary hover:text-white dark:border-gray-600"
                >
                  <h4 className="whitespace-normal">#{i.name}</h4>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBarRecommend;
