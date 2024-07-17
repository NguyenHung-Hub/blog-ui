"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IPagination {
  currentPage?: number;
  pageCount?: number;
  onChange?: Function;
  hidden?: boolean;
}

const Pagination = ({
  currentPage = 1,
  pageCount = 5,
  hidden = false,
}: IPagination) => {
  const pageRangeDisplayed = pageCount < 5 ? pageCount : 5;

  const [pages, setPages] = useState<number[]>(
    Array.from({ length: pageRangeDisplayed }, (v, k) => k + 1),
  );

  const [startPage, setStartPage] = useState<number>(
    Math.floor(currentPage / pageRangeDisplayed) * pageRangeDisplayed,
  );

  useEffect(() => {
    let start =
      Math.floor(currentPage / pageRangeDisplayed) * pageRangeDisplayed;
    if (pageCount - currentPage < pageRangeDisplayed) {
      start = pageCount - pageRangeDisplayed;
    }
    setStartPage(start);

    const pages = Array.from(
      { length: pageRangeDisplayed },
      (v, k) => k + start + 1,
    );
    setPages(pages);
  }, [currentPage]);

  // const pages = [1, 2, 3, 4, 5];
  // const pages = [6,7,8,9,10];
  // const pages = [11,12,13,14,15];

  if (hidden || pageCount < 2) {
    return <></>;
  }

  return (
    <div className="f-center mt-10 w-full">
      <div className="flex">
        <Link
          href={`?page=1`}
          className={`f-center m-1 h-6 w-6 rounded text-sm hover:border hover:border-sky-500`}
        >
          <Image
            src={"/svg/angle-double-small-left.svg"}
            width={20}
            height={20}
            alt="angle-double-small-left-icon"
          />
        </Link>
        <Link
          href={`?page=${Math.max(currentPage - 1, 1)}`}
          className={`f-center m-1 h-6 w-6 rounded text-sm hover:border hover:border-sky-500`}
        >
          <Image
            src={"/svg/angle-small-left.svg"}
            width={20}
            height={20}
            alt="angle-small-left-icon"
          />
        </Link>
        {pages.map((p, i) => {
          return (
            <Link
              key={i}
              href={`?page=${p}`}
              className={`f-center m-1 h-6 w-6 ${
                currentPage == i + 1
                  ? "bg-sky-500 text-white"
                  : "bg-transparent"
              } rounded text-sm hover:border hover:border-sky-500`}
            >
              {p}
            </Link>
          );
        })}
        <Link
          href={`?page=${Math.min(currentPage + 1, pageCount)}`}
          className={`f-center m-1 h-6 w-6 rounded text-sm hover:border hover:border-sky-500`}
        >
          <Image
            src={"/svg/angle-small-right.svg"}
            width={20}
            height={20}
            alt="angle-small-right-icon"
          />
        </Link>
        <Link
          href={`?page=${pageCount}`}
          className={`f-center m-1 h-6 w-6 rounded text-sm hover:border hover:border-sky-500`}
        >
          <Image
            src={"/svg/angle-double-small-right.svg"}
            width={20}
            height={20}
            alt="angle-double-small-right-icon"
          />
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
