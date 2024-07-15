import React from "react";
import { listPost } from "~/service/post";
import PostCard from "./Card/PostCard";
import Pagination from "./Pagination/Pagination";

const PostGrid = async ({
  categorySlug,
  page,
}: {
  categorySlug: string;
  page: number;
}) => {
  const posts = await listPost({ page, categorySlug, status: ["visibility"] });
  return (
    <div id="post" className="col-span-12 lg:col-span-9 lg:mr-5">
      <div className="mx-4 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2 lg:grid-cols-3">
        {posts?.data.map((i) => <PostCard key={i._id} {...i} />)}
      </div>
      <Pagination
        currentPage={page}
        pageCount={Math.ceil(posts?.paging?.total ? posts.paging.total / 9 : 1)}
      />
    </div>
  );
};

export default PostGrid;
