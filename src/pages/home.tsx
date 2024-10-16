/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import BookCard from "../components/book-card";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // get books
  const getBooks = async () => {
    setIsLoading(true);
    const res = await fetch(`https://gutendex.com/books`);
    const data = await res.json();
    setBooks(data?.results);
    setIsLoading(false);
  };

  // fetch data
  useEffect(() => {
    getBooks();
  }, []);

  console.log(books);

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-20 grid gap-8">
      <h1 className="text-3xl font-medium tracking-tighter">
        List of Gutenberg ebook.
      </h1>
      {isLoading && <p className="py-4">Loading..</p>}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {books &&
          books?.length > 0 &&
          books?.map((book: any) => <BookCard key={book?.id} book={book} />)}
      </div>
    </section>
  );
};

export default HomePage;
