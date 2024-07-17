import React from "react";
import Tag from "~/components/Tag/Tag";
import { IResourceFull } from "~/interfaces/resource";

const ResourceCardSearch = (props: IResourceFull) => {
  return (
    <div className="w-full pb-2">
      <div className="flex">
        <h2 className="my-1 flex-1 truncate pl-4 text-lg font-semibold group-hover:text-purple-500">
          {props.title}
        </h2>
        <div className="w-fit">
          <p className="rounded-bl-lg bg-gradient-to-br from-violet-400 to-pink-400 px-2 py-1 text-[12px] font-semibold uppercase tracking-wider text-white">
            {props.type}
          </p>
        </div>
      </div>
      <div className="px-4">
        <p className="line-clamp-3 text-sm">{props.description}</p>
        <div className="no-scrollbar mt-1.5 overflow-x-auto md:mt-2">
          <div className="flex">
            {props.categories.map((item) => (
              <Tag key={item._id} name={item.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCardSearch;
