/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

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
    <section className="max-w-screen-lg mx-auto px-4 py-20 grid gap-8">
      <h1 className="text-3xl font-medium tracking-tighter">
        List of Gutenberg ebook.
      </h1>
      {isLoading && <p className="py-4">Loading..</p>}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books &&
          books?.length > 0 &&
          books?.map((book: any) => (
            <div
              key={book?.id}
              className="bg-white p-4 rounded-xl border border-zinc-200 shadow hover:shadow-xl grid gap-4"
            >
              <img
                src={book?.formats["image/jpeg"]}
                alt="book cover"
                className="h-full max-h-60 w-full object-cover rounded-md"
              />
              <h3 className="text-xl font-medium tracking-tighter truncate text-zinc-700">{book?.title}</h3>
            </div>
          ))}
      </div>
    </section>
  );
};

export default HomePage;
