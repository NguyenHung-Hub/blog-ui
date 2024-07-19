import React from "react";

export interface ICardDashboardInfo {
  name: string;
  total: number;
  visibility: number;
  className?: string;
}

const CardInfo = ({
  name,
  total,
  visibility,
  className = "bg-white",
}: ICardDashboardInfo) => {
  return (
    <div
      className={`flex rounded-lg border border-gray-100 backdrop-blur-sm ${className}`}
    >
      <div className="flex w-1/2 flex-col justify-center border-r-2 border-r-white px-4">
        <div className="font-semibold">Total {name}</div>
        <div className="mt-4 w-full text-center text-4xl font-extrabold md:text-6xl">
          {total}
        </div>
      </div>
      <div className="w-1/2">
        <div className="border-b-2 border-b-white px-4 py-2">
          <div className="font-semibold">Visibility</div>
          <div className="w-full text-center text-3xl font-bold">
            {visibility}
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="font-semibold">Hidden</div>
          <div className="w-full text-center text-3xl font-bold">
            {total - visibility}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
