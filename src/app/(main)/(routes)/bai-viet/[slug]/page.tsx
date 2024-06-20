import React from "react";
import Image from "next/image";
import { getPost } from "~/service/post";
import formatDate from "~/util/formatDate";
import Highlight from "./_components/HighLight";
import SideBarRecommend from "~/app/(main)/_components/SideBar/SideBarRecommend";

async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <main className="fc-center relative py-14">
      <div className="mt-16 flex w-full md:w-[720px] lg:w-[960px] xl:w-1200">
        <div className="relative w-full flex-1 px-3 lg:mr-8 lg:max-w-[900px] lg:px-0">
          {post ? (
            <div className="flex w-full flex-col">
              <div className="f-center mb-8 w-full">
                <Image
                  src={post?.photo}
                  width={480}
                  height={360}
                  alt={post.title}
                  loading="eager"
                  priority={true}
                  quality={100}
                  className="h-auto w-full rounded-sm object-cover"
                />
              </div>
              <div className="text-gray-700 dark:text-light">
                <div className="my-2 flex items-center text-sm">
                  <h3 className="font-semibold">{post.author}</h3>
                  <div className="mx-1 h-3 w-px bg-dark dark:bg-light"></div>
                  <p>{formatDate(post.createdAt)}</p>
                </div>

                <div className="mt-2 flex">
                  {post.categories.map((i) => (
                    <div
                      key={i._id}
                      className="w-fit rounded border border-gray-400 px-1 py-0.5 text-12 [&:not(:last-child)]:mr-[4px]"
                    >
                      #{i.name}
                    </div>
                  ))}
                </div>
                <h1 className="mt-4 font-bold sm:text-xl md:text-2xl lg:text-4xl">
                  {post.title}
                </h1>
              </div>
              {/* <ReadOnlyEditor content={post.description} /> */}
              <div
                id="post-content"
                dangerouslySetInnerHTML={{ __html: post.description }}
              ></div>
              <Highlight />
            </div>
          ) : (
            <div>null</div>
          )}
        </div>
        <SideBarRecommend />
      </div>
    </main>
  );
}
export default PostPage;
