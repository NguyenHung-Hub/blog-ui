import Image from "next/image";
import React from "react";
import Tag from "~/components/Tag/Tag";
import { IPostSearch } from "~/interfaces/post";

const PostCardSearch = (props: IPostSearch) => {
  return (
    <>
      <div className="h-28 w-28 md:h-36 md:w-36">
        <Image
          src={props.photo}
          width={144}
          height={144}
          alt={props.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 py-1 pl-4 pr-2 md:py-2">
        <p className="truncate font-semibold">{props.title}</p>
        <p className="mt-1.5 line-clamp-2 text-ellipsis text-sm md:mt-2 md:line-clamp-3">
          {props.shortDescription}
        </p>
        <div className="no-scrollbar mt-1.5 overflow-x-auto md:mt-2">
          <div className="flex">
            {props.categories.map((item) => (
              <Tag key={item._id} name={item.name} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCardSearch;
