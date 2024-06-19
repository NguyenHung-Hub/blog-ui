import React from "react";
import BannerPaper from "./_components/BannerPaper";
import PostGrid from "./_components/PostGrid";
import SideBarRecommend from "../../_components/SideBar/SideBarRecommend";

const HomePage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  console.log(`file: page.tsx:13 > page:`, params, searchParams);
  return (
    <main className="fc-center pt-14">
      <BannerPaper />
      <div className="mt-16 flex w-full flex-col items-center md:w-[720px] lg:w-[960px] lg:flex-row lg:items-start xl:w-1200">
        <PostGrid
          categorySlug={params?.slug ? params?.slug[0] : ""}
          page={searchParams?.page ? Number(searchParams.page) : 1}
        />
        <SideBarRecommend />
      </div>
    </main>
  );
};

export default HomePage;
