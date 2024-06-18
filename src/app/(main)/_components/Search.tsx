"use client";
import React, { MouseEvent, useEffect, useRef, useState } from "react";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (searchText.startsWith(" ")) {
      setSearchText(searchText);
    }
  };

  const handleClear = () => {
    setSearchText("");
    inputRef.current?.focus();

    setSearchResult([]);
  };

  useEffect(() => {
    const handleClickOutside =
      () => (event: React.MouseEvent<Element, MouseEvent>) => {
        if (
          searchRef.current &&
          !searchRef.current?.contains(event.target as globalThis.Node)
        ) {
          setShowResult(false);
        }
      };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div ref={searchRef} className="relative hidden w-1/3 md:block">
      <div className="relative flex h-10 w-full items-center overflow-hidden rounded-3xl border border-gray-300 dark:border-gray-700">
        <input
          type="text"
          ref={inputRef}
          value={searchText}
          onChange={handleOnChangeSearch}
          placeholder="Tìm kiếm"
          className="ml-4 flex-1 border-0 bg-transparent caret-primary outline-none"
        />

        {!!searchText && !loading && (
          <button
            onClick={handleClear}
            className="mr-0.5"
            aria-label="Clear search text"
          >
            <img src="/svg/cross-circle.svg" alt="" className="h-4 w-4" />
          </button>
        )}

        {loading && (
          <button className="mr-0.5" aria-label="Search loading">
            <img src="/svg/loading.svg" alt="" className="h-4 w-4" />
          </button>
        )}

        <button
          className="f-center h-full w-10 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-400"
          aria-label="Search button"
        >
          <img src="/svg/search.svg" alt="" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Search;
