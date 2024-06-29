"use client";
import React, { useState } from "react";
import { useGetResourcesQuery } from "~/store/services/resource";
import CardResource from "./_components/CardResource";
import Loading from "~/components/Loading/Loading";

const ResourcePage = () => {
  const [resourceType, setResourceType] = useState<string>("all");

  const { data, isLoading } = useGetResourcesQuery(
    `resources${resourceType == "all" ? "" : `?type=${resourceType}`}`,
    {
      pollingInterval: 30000,
      skipPollingIfUnfocused: true,
    },
  );

  const tabs = [
    { id: 1, name: "Tất cả", value: "all" },
    { id: 2, name: "Youtube", value: "youtube" },
    { id: 3, name: "Website", value: "website" },
    { id: 4, name: "Tool", value: "tool" },
    { id: 5, name: "Extension", value: "extension" },
    { id: 6, name: "Github", value: "github" },
    { id: 7, name: "Document", value: "document" },
    { id: 8, name: "Khác", value: "other" },
  ];

  return (
    <main className="container mx-auto min-h-screen pt-14">
      <div className="f-center mt-4 w-full p-2">
        <ul>
          {tabs.map((t) => (
            <li
              key={t.id}
              className="inline-block hover:cursor-pointer [&:not(:last-child)]:mr-8"
            >
              <div
                className={`select-none rounded-full px-4 py-2 font-semibold tracking-wide ${resourceType == t.value ? "bg-orange-400 text-white" : "bg-gray-200 dark:bg-dark-ele"}`}
                onClick={() => setResourceType(t.value)}
              >
                {t.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isLoading ? (
        <div className="f-center min-h-40 w-full">
          <Loading />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((resource) => (
            <CardResource key={resource._id} resource={resource} />
          ))}
        </div>
      )}
    </main>
  );
};

export default ResourcePage;
