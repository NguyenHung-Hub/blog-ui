"use client";
import React, { useEffect, useState } from "react";
import Table, { GridColDef, GridRowDef } from "~/components/Table/Table";
import { listPost, updatePostStatus } from "~/service/post";
import { useAppSelector } from "~/store";
import { formatDateTime } from "~/util/formatDate";
import Button from "~/components/Button/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SideBarProfile from "./_components/SideBarProfile";
import Link from "next/link";
import cfg from "~/config";
import IsAuthRoute from "~/app/_components/IsAuth";

interface IRowPost extends GridRowDef {
  postId: string;
  title: string;
  photo: string;
  categories: string[];
  status: "visibility" | "hidden";
  slug: string;
  createdAt: string;
  updatedAt: string;
}
const Profile = () => {
  const columns: GridColDef[] = [
    { field: "rowId", title: "#", width: 50 },
    {
      field: "photo",
      title: "Thumnail",
      width: 100,
      render: (value) => (
        <div className="h-24 w-24">
          <Image
            height={100}
            width={100}
            className="h-full w-full rounded-md border border-gray-300 object-contain"
            src={value}
            alt={value}
          />{" "}
        </div>
      ),
    },
    {
      field: "title",
      title: "Title",
      width: 250,
      align: "left",
      sortable: true,
    },
    {
      field: "categories",
      title: "Categories",
      width: 150,
      align: "left",
      sortable: true,
      render: (value) => {
        const cate = value as unknown as string[];
        return <div>{cate.join(", ")}</div>;
      },
    },
    {
      field: "status",
      title: "Status",
      width: 120,
      sortable: true,
      render: (value) => {
        return (
          <div className="flex justify-center">
            <div
              className={`w-fit select-none rounded-md border px-2 py-0.5 text-12 font-semibold text-white ${
                value == "hidden" ? "bg-primary" : "bg-success"
              }`}
            >
              {value}
            </div>
          </div>
        );
      },
    },
    {
      field: "updatedAt",
      title: "Updated at",
      width: 150,
      sortable: true,
      render: (value) => {
        return <div>{formatDateTime(value)}</div>;
      },
    },
    {
      field: "createdAt",
      title: "Created at",
      width: 150,
      sortable: true,
      render: (value) => {
        return <div>{formatDateTime(value)}</div>;
      },
    },
  ];

  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const [rows, setRows] = useState<IRowPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [historyPage, setHistoryPage] = useState<number[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  useEffect(() => {
    async function fetchPost(page: number, limit: number) {
      const result = await listPost({
        page: page,
        limit: limit,
        status: ["visibility", "hidden"],
        authorId: user.user._id,
      });

      if (result?.data && result?.data?.length > 0) {
        const post = result.data.map<IRowPost>((i, index) => ({
          rowId: ((currentPage - 1) * itemsPerPage + index + 1).toString(),
          postId: i._id,
          photo: i.photo,
          title: i.title,
          categories: i.categories.map((c) => c.name),
          status: i.status,
          slug: i.slug,
          updatedAt: i.updatedAt,
          createdAt: i.createdAt,
        }));

        setRows([...rows, ...post]);
        setHistoryPage(Array.from(new Set([...historyPage, page])));
        setTotalPages(Math.ceil(result.paging.total / itemsPerPage));
      }
    }
    if (currentPage <= totalPages && !historyPage.includes(currentPage)) {
      fetchPost(currentPage, 5);
    }
  }, [currentPage]);

  function onClickEdit(postSlug: string) {
    router.push(`write/${postSlug}`);
  }

  async function onClickHiddenPublish(
    postId: string,
    currentStatus: "visibility" | "hidden",
  ) {
    const res = await updatePostStatus({
      _id: postId,
      author: user.user._id,
      status: currentStatus == "hidden" ? "visibility" : "hidden",
    });
    if (res) {
      const newRows = rows.map((i) => {
        if (i.postId == res._id) {
          return { ...i, status: res.status };
        }
        return i;
      });
      setRows(newRows);
    }
  }

  return (
    <main className="grid h-screen grid-cols-12 grid-rows-1 pt-14">
      <SideBarProfile />
      <div className="col-span-9 px-4 py-8">
        <Table
          columns={columns}
          rows={rows}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={5}
          totalPages={totalPages}
          actionCol={(row) => {
            const rowData = row as unknown as IRowPost;
            return (
              <div className="group relative w-fit">
                <Button small>
                  <Image
                    width={20}
                    height={20}
                    src={"svg/fi_more-horizontal.svg"}
                    alt="more action button"
                  />
                </Button>
                <div className="after:contents[' '] absolute right-full top-0 hidden w-auto rounded border border-gray-200 bg-white p-2 drop-shadow-xl after:absolute after:bottom-full after:right-[58px] after:h-0 after:w-0 group-hover:flex">
                  <Button
                    small
                    success
                    rounded
                    onClick={() => onClickEdit(rowData.slug)}
                  >
                    Edit
                  </Button>
                  <Link
                    href={`${cfg.routes.post}/${rowData.slug}`}
                    target="_blank"
                    className="ml-2 rounded bg-success px-3 py-1.5 text-xs font-semibold text-white hover:bg-success/80"
                  >
                    View
                  </Link>
                  <Button
                    small
                    primary
                    rounded
                    className="ml-2"
                    onClick={() =>
                      onClickHiddenPublish(rowData.postId, rowData.status)
                    }
                  >
                    {rowData.status == "hidden" ? "Public" : "Hide"}
                  </Button>
                  <Button small primary rounded className="ml-2">
                    Delete
                  </Button>
                </div>
              </div>
            );
          }}
        />
      </div>
    </main>
  );
};

export default IsAuthRoute(Profile);
