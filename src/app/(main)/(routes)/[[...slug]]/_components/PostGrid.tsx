import React from "react";
import PostCard from "./Card/PostCard";
import Pagination from "./Pagination/Pagination";
import { listPost } from "~/service/post";

const PostGrid = async ({
  categorySlug,
  page,
}: {
  categorySlug: string;
  page: number;
}) => {
  console.log(`file: PostGrid.tsx:13 > page:`, page);
  const posts = await listPost({ page, categorySlug, status: ["visibility"] });
  return (
    <div id="post" className="lg:mr-5">
      <div className="mx-4 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2 lg:grid-cols-3">
        {posts.data.map((i) => (
          <PostCard key={i._id} {...i} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        pageCount={Math.ceil(posts.paging.total / 9)}
      />
    </div>
  );
};

export default PostGrid;
