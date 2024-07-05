"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InputTags from "~/app/_components/InputTags";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import Loading from "~/components/Loading/Loading";
import ModalBase from "~/components/Modal/ModalBase";
import Select from "~/components/Select/Select";
import Table, { GridColDef, GridRowDef } from "~/components/Table/Table";
import TextArea from "~/components/TextArea/TextArea";
import cfg from "~/config";
import { ICategories } from "~/interfaces/category";
import { useAppDispatch } from "~/store";
import api, {
  useCreateResourceMutation,
  useDeleteResourceMutation,
  useGetResourcesQuery,
  useUpdateResourceMutation,
} from "~/store/services/resource";
import { TResourceStatus, TResourceType } from "~/types/resource";
import { formatDateTime } from "~/util/formatDate";

interface IRowResource extends GridRowDef {
  resourceId: string;
  title: string;
  type: string;
  url: string;
  categories: string[];
  status: TResourceStatus;
  createdAt: string;
  updatedAt: string;
}

const ResourceDashboardPage = () => {
  const columns: GridColDef[] = [
    {
      field: "rowId",
      title: "#",
      width: 50,
    },
    {
      field: "title",
      title: "Title",
      width: 250,
      align: "left",
    },
    {
      field: "categories",
      title: "Categories",
      width: 300,
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
      field: "type",
      title: "Type",
      width: 150,
      sortable: true,
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

  const dispatch = useAppDispatch();

  const [rows, setRows] = useState<IRowResource[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [modalNewResource, setModalNewResource] = useState<boolean>(false);
  const [resourceTitle, setResourceTitle] = useState<string>("");
  const [resourceUrl, setResourceUrl] = useState<string>("");
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [resourceStatus, setResourceStatus] =
    useState<TResourceStatus>("visibility");
  const [resourceType, setResourceType] = useState<TResourceType>("youtube");
  const [resourceDescription, setResourceDescription] = useState<string>("");

  const {
    data: resources,
    isLoading,
    refetch,
  } = useGetResourcesQuery(
    `/resources?page=${currentPage}&limit=10&status=visibility&status=hidden`,
    {
      pollingInterval: 10000,
      skipPollingIfUnfocused: true,
    },
  );

  const [createResource] = useCreateResourceMutation();
  const [updateResource] = useUpdateResourceMutation();
  const [deleteResource] = useDeleteResourceMutation();

  const removeResourceDuplicates = (array: IRowResource[]): IRowResource[] => {
    const uniqueItems = array.reduce(
      (acc: { [key: string]: IRowResource }, item) => {
        acc[item.resourceId] = item;
        return acc;
      },
      {},
    );

    return Object.values(uniqueItems);
  };

  useEffect(() => {
    if (resources?.data) {
      const newRows = resources.data.map<IRowResource>((r, i) => ({
        rowId: ((currentPage - 1) * itemsPerPage + i + 1).toString(),
        resourceId: r._id,
        title: r.title,
        url: r.url,
        categories: r.categories.map((c) => c.name),
        status: r.status,
        type: r.type,
        updatedAt: r.updatedAt,
        createdAt: r.createdAt,
      }));

      const sortedRows = removeResourceDuplicates([...rows, ...newRows]).sort(
        (a, b) => {
          const t1 = new Date(a.createdAt).getTime();
          const t2 = new Date(b.createdAt).getTime();
          return t2 - t1;
        },
      );

      setRows(sortedRows);
      setTotalPages(Math.ceil(resources.paging.total / itemsPerPage));
    }
  }, [resources, currentPage]);

  const onClickUpdateStatus = async (
    _id: string,
    currentStatus: TResourceStatus,
  ) => {
    const updateStatus: TResourceStatus =
      currentStatus == "hidden" ? "visibility" : "hidden";
    const result = await updateResource({
      _id,
      status: updateStatus,
    }).unwrap();
    console.log(`file: page.tsx:197 > result:`, result);
    if (result.code == 200) {
      const newRows = rows.map((r) => {
        if (r.resourceId == _id) {
          return { ...r, status: updateStatus };
        }
        return r;
      });
      setRows(newRows);
    }
  };

  const onClickDelete = async (id: string) => {
    const result = await deleteResource({ id }).unwrap();
    setRows([]);
    dispatch(api.util.resetApiState());
    refetch();
  };

  const onCLickCancel = () => {
    setModalNewResource(false);
  };

  const onCLickSave = async () => {
    const result = await createResource({
      title: resourceTitle,
      url: resourceUrl,
      type: resourceType,
      description: resourceDescription,
      status: resourceStatus,
      categories: categories.map((c) => c._id),
    }).unwrap();

    if (result.error == null && result.data._id) {
      setModalNewResource(false);
      setRows([]);
      dispatch(api.util.resetApiState());
      refetch();
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Button rounded success small onClick={() => setModalNewResource(true)}>
          New
        </Button>

        <Button small rounded success className="ml-4 bg-blue-400">
          <Link href={cfg.routes.resources}>View Page</Link>
        </Button>

        <ModalBase
          setShowModal={setModalNewResource}
          showModal={modalNewResource}
        >
          <p className="text-lg font-semibold">Create resource</p>
          <div className="px-2 pt-4">
            <Input
              title="Title"
              className="mb-4"
              value={resourceTitle}
              onChange={(e) => setResourceTitle(e.target.value)}
            />
            <InputTags
              className="mb-4 p-2"
              setValues={setCategories}
              values={categories}
            />
            <Input
              title="Url"
              className="mb-4"
              value={resourceUrl}
              onChange={(e) => setResourceUrl(e.target.value)}
            />
            <Select
              title="Type"
              options={[
                { label: "Youtube", value: "youtube" },
                { label: "Website", value: "website" },
                { label: "Tool", value: "tool" },
                { label: "Extension", value: "extension" },
                { label: "Github", value: "github" },
                { label: "Document", value: "document" },
                { label: "Other", value: "other" },
              ]}
              value={resourceType}
              className="mb-4"
              onChange={(e) =>
                setResourceType(e.target.value as unknown as TResourceType)
              }
            />
            <Select
              title="Status"
              options={[
                { label: "Visibility", value: "visibility" },
                { label: "Hidden", value: "hidden" },
              ]}
              value={resourceStatus}
              onChange={(e) =>
                setResourceStatus(e.target.value as unknown as TResourceStatus)
              }
              className="mb-4"
            />
            <TextArea
              title="Description"
              value={resourceDescription}
              onChange={(e) => setResourceDescription(e.target.value)}
              className="mb-4"
              rows={3}
            />
          </div>
          <div className="flex w-full justify-end">
            <Button primary rounded className="mr-4" onClick={onCLickCancel}>
              Cancel
            </Button>
            <Button success rounded disabled={false} onClick={onCLickSave}>
              Save
            </Button>
          </div>
        </ModalBase>
      </div>
      <div>
        {isLoading ? (
          <div className="f-center h-60 w-full">
            <Loading />
          </div>
        ) : (
          <Table
            columns={columns}
            rows={rows}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            actionCol={(row) => {
              const rowData = row as unknown as IRowResource;
              return (
                <div className="group relative w-fit">
                  <Button small>
                    <Image
                      width={20}
                      height={20}
                      src={"/svg/fi_more-horizontal.svg"}
                      alt="more action button"
                    />
                  </Button>
                  <div className="after:contents[' '] absolute right-full top-0 hidden w-auto rounded border border-gray-200 bg-white p-2 drop-shadow-xl after:absolute after:bottom-full after:right-[58px] after:h-0 after:w-0 group-hover:flex">
                    <Button small success rounded>
                      Edit
                    </Button>

                    <Button
                      small
                      primary
                      rounded
                      className="ml-2"
                      onClick={() =>
                        onClickUpdateStatus(row.resourceId, row.status)
                      }
                    >
                      {rowData.status == "hidden" ? "Public" : "Hide"}
                    </Button>
                    <Button
                      small
                      primary
                      rounded
                      className="ml-2"
                      onClick={() => onClickDelete(row.resourceId)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ResourceDashboardPage;
