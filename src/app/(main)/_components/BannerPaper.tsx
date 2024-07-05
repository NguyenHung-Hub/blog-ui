import formatDate from "~/util/formatDate";
import React from "react";
import { listPostRandom } from "~/service/post";
import cfg from "~/config";
import Link from "next/link";
import TornPaperIcon from "~/components/Icons/TornPaperIcon";

const BannerPaper = async () => {
  const post = await listPostRandom({
    n: 1,
  });

  const color = [
    "#D6DAC8",
    "#D1BB9E",
    "#AFD198",
    "#B3C8CF",
    "#FFE6E6",
    "#D0BFFF",
  ];
  const random = Math.floor(Math.random() * color.length);
  const c = "md:bg-[" + color[random] + "]";
  return (
    <div
      className={`relative h-[216px] w-full select-none overflow-hidden sm:h-[234px] md:mt-8 md:h-[288px] md:w-[720px] md:rounded-lg lg:h-[324px] lg:w-[960px] xl:h-[360px] xl:w-1200`}
      style={{ background: `${color[random]}` }}
    >
      <div className="absolute left-0 top-0 z-30 h-full w-full md:w-[512px] lg:w-[567px] xl:w-[640px]">
        <img
          src={post[0].photo}
          className="h-full w-full object-cover"
          alt="image"
        />
      </div>
      <div className="absolute left-0 top-0 z-50 h-full w-full md:-top-1 md:left-auto md:right-0 md:w-[360px] lg:w-[440px] xl:w-[620px]">
        <div className="absolute -left-6 top-0 hidden h-full md:block xl:left-0">
          <TornPaperIcon bg={color[random]} />
          <img src="/svg/torn-paper-2.svg" alt="" className="h-[380px]" />
        </div>
        <div className="absolute h-full w-full px-4 py-2 text-white sm:left-1/2 sm:top-1/2 sm:h-auto sm:w-11/12 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:px-0 sm:py-4 md:left-1/2 md:-translate-x-1/2 md:py-0 md:text-foreground lg:right-8 lg:w-4/5 xl:right-10">
          <div className="flex h-full flex-col justify-between">
            <p className="text-base font-semibold sm:text-lg md:text-xl lg:text-26">
              {post[0].title}
            </p>
            <div className="mt-2">
              <div className={`flex items-center`}>
                <p className="mr-2">{formatDate(post[0].createdAt)}</p>
                <div className="h-3 w-px bg-white md:bg-black-1"></div>

                <div className="ml-2 flex items-center">
                  {post[0].categories.map((c, i) => (
                    <p key={i} className={`px-1 text-xs font-bold uppercase`}>
                      #{c.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-2 line-clamp-3 text-sm italic sm:mt-4 sm:text-base lg:line-clamp-4 xl:line-clamp-5">
              {post[0]?.shortDescription}
            </p>
            <div>
              <Link
                href={`${cfg.routes.post}/${post[0].slug}`}
                className="md:mt6 mt-2 block w-fit rounded border border-slate-800 px-4 py-2 sm:mt-4"
              >
                Xem thêm
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-40 bg-black/10 backdrop-blur-[2px] md:hidden"></div>
    </div>
  );
};

export default BannerPaper;
