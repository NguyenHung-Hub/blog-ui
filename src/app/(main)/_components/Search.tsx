"use client";
import { useEffect, useState } from "react";
import Loading from "~/components/Loading/Loading";
import ModalBase from "~/components/Modal/ModalBase";
import useDebounce from "~/hook/useDebounce";
import { ISearchDataResponse } from "~/interfaces/search";
import { useSearchQuery } from "~/store/services/resource";
import PostCardSearch from "./Card/PostCardSearch";
import ResourceCardSearch from "./Card/ResourceCardSearch";
import Link from "next/link";
import cfg from "~/config";
import useDisableScroll from "~/hook/useDisableScroll";
import SearchIcon from "~/components/Icons/SearchIcon";
import { useAppDispatch, useAppSelector } from "~/store";
import { toggleSearchModal } from "~/store/reducer/searchModal";

const Search = () => {
  const dispatch = useAppDispatch();
  const searchStore = useAppSelector((state) => state.searchModal);

  const [searchModal, setSearchModal] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string>("");
  const debouncedText = useDebounce(textSearch, 800);
  const [searchResult, setSearchResult] = useState<ISearchDataResponse>();

  const { data: searchData, isFetching } = useSearchQuery(
    debouncedText != "" ? `/search?q=${debouncedText}` : "",
    {
      skip: debouncedText == "",
    },
  );

  const { setDisableScroll } = useDisableScroll();

  useEffect(() => {
    setDisableScroll(searchModal);
  }, [searchModal]);

  useEffect(() => {
    setSearchModal(searchStore.isOpen);
  }, [searchStore]);

  useEffect(() => {
    if (!debouncedText) {
      setSearchResult(undefined);
    } else if (searchData && !isFetching) {
      setSearchResult(searchData.data);
    }
  }, [debouncedText, searchData, isFetching]);

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "k") {
      setSearchModal(true);
    } else if (event.key === "Escape") {
      setSearchModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, []);

  function handleSearchModal(state: boolean) {
    setSearchModal(state);
    dispatch(toggleSearchModal(state));
  }

  return (
    <>
      <div
        onClick={() => handleSearchModal(true)}
        className="f-center mx-4 h-10 rounded border border-gray-500 px-2 hover:cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 md:px-4"
      >
        <div className="flex w-full select-none justify-between text-gray-700 dark:text-gray-400">
          <span className="mr-12">Tìm kiếm</span>
          <span className="font-semibold">Ctrl K</span>
        </div>
      </div>
      <ModalBase
        setShowModal={setSearchModal}
        showModal={searchModal}
        className="mx-2 h-4/5 w-full dark:bg-dark sm:mx-10 md:mx-0 md:w-[758px] md:px-0"
      >
        <div className="fc-center h-full w-full">
          <div className="flex w-full items-center border-b border-b-gray-200 px-1 pb-2 dark:border-b-gray-600 md:px-4">
            <div>
              <SearchIcon className="h-5 w-5" />
            </div>
            <input
              autoFocus
              type="text"
              className="mx-2 flex-1 border-none bg-transparent py-2 text-lg outline-none"
              placeholder="Tìm kiếm"
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
            />
            <div
              onClick={() => handleSearchModal(false)}
              className="select-none rounded border border-gray-400 px-1.5 py-1 text-sm text-gray-500 hover:cursor-pointer dark:border-gray-600"
            >
              Esc
            </div>
          </div>
          <div className="scrollbar w-full flex-auto overflow-auto p-1.5 md:p-4">
            {isFetching && (
              <div className="f-center h-full w-full">
                <Loading />
              </div>
            )}
            {!isFetching && !searchResult?.post && !searchResult?.resource && (
              <div className="f-center h-full w-full">
                <div>Không có kết quả</div>
              </div>
            )}

            <div className="md:px-4">
              {searchResult?.post && (
                <section>
                  <div className="text-lg font-semibold">
                    Bài viết ({searchResult.post.length})
                  </div>
                  <ul>
                    {searchResult?.post?.map((p) => (
                      <li key={p._id}>
                        <Link
                          href={`${cfg.routes.post}/${p.slug}`}
                          onClick={() => handleSearchModal(false)}
                          className="mt-5 flex w-full items-center overflow-hidden rounded-lg border border-gray-300 hover:cursor-pointer hover:border-primary dark:border-gray-600 hover:dark:border-primary"
                        >
                          <PostCardSearch {...p} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {searchResult?.resource && (
                <section className="mt-8">
                  <div className="text-lg font-semibold">
                    Tài nguyên ({searchResult.resource.length})
                  </div>
                  <ul>
                    <ul>
                      {searchResult?.resource?.map((r) => (
                        <li key={r._id}>
                          <Link
                            href={r.url}
                            target="_blank"
                            onClick={() => handleSearchModal(false)}
                            className="mt-5 flex w-full items-center overflow-hidden rounded-lg border border-gray-300 hover:cursor-pointer hover:border-primary dark:border-gray-600 hover:dark:border-primary"
                          >
                            <ResourceCardSearch {...r} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      </ModalBase>
    </>
  );
};

export default Search;
