/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";
import BookCard from "../components/book-card";
import { ArrowPathIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import useDebounce from "../hooks/useDebounce";
import { topics } from "../constants";

const HomePage = () => {
  // api data states
  const [books, setBooks] = useState([]);
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  // search, filter & page state
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [filter, setFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  // drop down ref
  const dropDownRef = useRef(null);

  // get books
  const getBooks = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://gutendex.com/books?search=${debouncedSearch}&page=${page.toString()}`
    );
    const data = await res.json();
    setBooks(data?.results);
    setIsLoading(false);
  }, [debouncedSearch, page]);

  // fetch data
  useEffect(() => {
    getBooks();
  }, [getBooks, search]);

  useEffect(() => {
    const close = (e: any) => {
      if (dropDownRef?.current && !dropDownRef?.current?.contains(e?.target))
        setIsFilterOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  console.log(books);

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-20 grid gap-8">
      <h1 className="text-3xl font-medium tracking-tighter">
        List of Gutenberg ebook.
      </h1>

      {/* search and filter */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* search */}
        <input
          type="text"
          placeholder="Search by title"
          className="px-4 py-2 rounded-full border border-zinc-200 focus:border-blue-600 outline-none w-full max-w-sm text-sm shadow bg-white"
          onChange={(e) => setSearch(e?.target?.value)}
        />
        {/* filter */}
        <div className="relative w-full max-w-40" ref={dropDownRef}>
          <div
            className="px-4 py-2 rounded-full border border-zinc-200 focus:border-blue-600 outline-none w-full text-sm shadow bg-white flex items-center justify-between gap-4 tracking-tighter text-zinc-500"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <p className="truncate">{filter ? filter : "Filter by topic"}</p>
            <ChevronDownIcon
              className={`size-5 text-zinc-500 ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </div>
          {isFilterOpen && (
            <ul className="absolute top-full mt-1 border border-zinc-200 shadow bg-white rounded-xl z-50 w-full max-h-40 overflow-y-auto list-none">
              {topics?.map((topic) => (
                <li
                  className="px-4 py-2 text-sm text-zinc-500 truncate hover:bg-zinc-100 hover:cursor-pointer"
                  onClick={() => {
                    setFilter(topic);
                    setIsFilterOpen(false);
                  }}
                >
                  {topic}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* loader */}
      {/* {isLoading && (
        <div className="flex items-center justify-center gap-1 mx-auto w-fit text-zinc-500">
          <ArrowPathIcon className="size-4 animate-spin" />
          <p className="text-sm">Loading..</p>
        </div>
      )} */}

      {/* book list */}
      {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {!isLoading &&
          books &&
          books?.length > 0 &&
          books?.map((book: any) => <BookCard key={book?.id} book={book} />)}
      </div> */}

      {/* pagination */}
      <div className="flex items-center gap-2 justify-end">
        <p className="text-sm text-zinc-500">Showing Page: {page}</p>
        <span className="flex items-center gap-2">
          <button
            className="button-solid"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1 || isLoading}
          >
            Previous
          </button>
          <button
            className="button-solid"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={isLoading}
          >
            Next
          </button>
        </span>
      </div>
    </section>
  );
};

export default HomePage;
