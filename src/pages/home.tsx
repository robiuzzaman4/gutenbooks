/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import BookCard from "../components/book-card";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const HomePage = () => {
  // api data states
  const [books, setBooks] = useState([]);
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  // search & page state
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // get books
  const getBooks = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://gutendex.com/books?search=${search}&page=${page.toString()}`
    );
    const data = await res.json();
    // console.log("data", data);

    setBooks(data?.results);
    setIsLoading(false);
  }, [search, page]);

  // fetch data
  useEffect(() => {
    getBooks();
  }, [getBooks, search]);

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
      </div>

      {/* loader */}
      {isLoading && (
        <div className="flex items-center justify-center gap-1 mx-auto w-fit text-zinc-500">
          <ArrowPathIcon className="size-4 animate-spin" />
          <p className="text-sm">Loading..</p>
        </div>
      )}

      {/* book list */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {!isLoading &&
          books &&
          books?.length > 0 &&
          books?.map((book: any) => <BookCard key={book?.id} book={book} />)}
      </div>

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
