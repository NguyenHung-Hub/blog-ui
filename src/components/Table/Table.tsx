"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

export interface GridColDef {
  field: string;
  title: string;
  width: number;
  render?: (value: any) => React.ReactNode;
  align?: "left" | "center" | "right";
  sortable?: boolean;
}

export interface GridRowDef {
  rowId: string;
}

interface TableProps<T extends GridRowDef> {
  columns: GridColDef[];
  rows: Array<T>;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  actionCol?: (obj: T) => React.ReactNode;
}

function Table<T extends GridRowDef>({
  columns,
  rows,
  itemsPerPage = 5,
  totalPages = 1,
  currentPage = 1,
  setCurrentPage,
  actionCol,
}: TableProps<T>) {
  const [sortBy, setSortBy] = useState<string | null>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("desc");
  const [sortedRows, setsortedRows] = useState<T[]>([]);

  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage],
  );
  const endIndex = useMemo(() => startIndex + itemsPerPage, [currentPage]);

  const displayedRows = useMemo(
    () => rows.slice(startIndex, endIndex),
    [rows, startIndex, endIndex],
  );

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    const s = [...rows].slice(startIndex, endIndex).sort((a, b) => {
      if (sortBy) {
        const aValue = a[sortBy as keyof T];
        const bValue = b[sortBy as keyof T];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === "object" && typeof bValue === "object") {
          const aString = JSON.stringify(aValue);
          const bString = JSON.stringify(bValue);

          return sortOrder === "asc"
            ? aString.localeCompare(bString)
            : bString.localeCompare(aString);
        } else {
          return 0;
        }
      }

      return 0;
    });
    setsortedRows(s);
  }, [sortBy, sortOrder, rows, currentPage]);

  return (
    <div className="rounded-md">
      <table className="min-w-min max-w-full text-left text-sm">
        <thead className="mx-0.5 h-8 border-b border-gray-500 font-medium dark:border-neutral-500">
          <tr>
            {columns.map((col, i) => {
              return (
                <th key={i} style={{ width: `${col.width}px` }}>
                  <div className="f-center">
                    <div>{col.title}</div>

                    {(function () {
                      if (col.sortable) {
                        if (sortBy == col.field) {
                          return (
                            <div
                              className="mx-2 cursor-pointer rounded-full p-1 hover:bg-slate-300"
                              onClick={() =>
                                col.sortable && handleSort(col.field)
                              }
                            >
                              <Image
                                width={12}
                                height={12}
                                src={
                                  sortOrder === "asc"
                                    ? "svg/fi_arrow-up.svg"
                                    : "svg/fi_arrow-down.svg"
                                }
                                alt="icon sort asc"
                              />
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className="mx-2 cursor-pointer rounded-full p-1 hover:bg-slate-300"
                              onClick={() =>
                                col.sortable && handleSort(col.field)
                              }
                            >
                              <div className="h-3 w-3 text-center">-</div>
                            </div>
                          );
                        }
                      }
                    })()}
                  </div>
                </th>
              );
            })}
            {actionCol && (
              <th className="max-w-fit">
                <div className="w-fit">Action</div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, index) => {
            return (
              <tr key={index} className="border-b dark:border-gray-300">
                {Object.entries(row).map((keyValue, i) => {
                  const [key, value] = keyValue;
                  const col = columns.find((c) => c.field === key);

                  if (col) {
                    const renderContent = col.render
                      ? col.render(value)
                      : value;
                    const aligns = {
                      left: "text-left",
                      center: "text-center",
                      right: "text-right",
                    };

                    return (
                      <td
                        key={i}
                        className={`table-cell max-w-[200px] overflow-hidden truncate text-ellipsis whitespace-pre-line p-2 ${
                          col.align ? aligns[col.align] : "text-center"
                        }`}
                      >
                        {renderContent}
                      </td>
                    );
                  }

                  return null;
                })}
                <td>{actionCol && actionCol(row)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex w-full justify-end px-4 py-2">
        <div className="text-14 mr-4 text-gray-600">
          page {currentPage} of {totalPages}
        </div>
        <div className="f-center">
          <div
            className="mx-2 cursor-pointer rounded-full p-1 hover:bg-slate-300"
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          >
            <Image
              width={16}
              height={16}
              src={"svg/fi_chevron-left.svg"}
              alt="icon prev page"
            />
          </div>
          <div
            className="mx-2 cursor-pointer rounded-full p-1 hover:bg-slate-300"
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
          >
            <Image
              width={16}
              height={16}
              src={"svg/fi_chevron-right.svg"}
              alt="icon next page"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
