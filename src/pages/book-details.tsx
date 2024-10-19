import { Link, useLoaderData } from "react-router-dom";
import { Book } from "../types";

const BookDetailsPage = () => {
  const book = useLoaderData() as Book;

  return (
    <section className="max-w-screen-md mx-auto px-4 py-20 grid gap-8">
      <Link to="/" className="button-secondary w-fit">
        Back to Home
      </Link>

      {/* cover */}
      {book?.formats["image/jpeg"] ? (
        <img
          src={book?.formats["image/jpeg"]}
          alt="book cover"
          className="h-60 w-full object-cover rounded-md"
        />
      ) : (
        <div className="h-60 w-full bg-zinc-200 rounded-md grid place-items-center text-center text-xl font-medium">
          N/A
        </div>
      )}

      {/* details */}
      <div className="grid gap-4">
        <h3 className="text-2xl md:text-4xl font-medium tracking-tighter truncate text-zinc-700">
          {book?.title}
        </h3>
        <span className="flex items-center gap-1">
          <h3 className="text-sm sm:text-base md:text-xl font-medium tracking-tighter shrink-0 text-zinc-700">
            Author:
          </h3>
          <h3 className="text-sm sm:text-base md:text-xl font-medium tracking-tighter line-clamp-1 text-zinc-500">
            {book?.authors[0]?.name ? book?.authors[0]?.name : "N/A"}
          </h3>
        </span>
        <span className="flex flex-col gap-1">
          <h3 className="text-sm sm:text-base md:text-xl font-medium tracking-tighter shrink-0 text-zinc-700">
            Subjects:
          </h3>
          <ul className="list-disc">
            {book?.subjects?.map((item: string, index: number) => (
              <li
                key={index}
                className="text-sm sm:text-base md:text-xl font-medium tracking-tighter line-clamp-1 text-zinc-500"
              >
                {item}
              </li>
            ))}
          </ul>
        </span>
        <span className="flex flex-col gap-1">
          <h3 className="text-sm sm:text-base md:text-xl font-medium tracking-tighter shrink-0 text-zinc-700">
            Bookshelves:
          </h3>
          <ul className="list-disc">
            {book?.bookshelves?.map((item: string, index: number) => (
              <li
                key={index}
                className="text-sm sm:text-base md:text-xl font-medium tracking-tighter line-clamp-1 text-zinc-500"
              >
                {item}
              </li>
            ))}
          </ul>
        </span>
        <span className="flex items-center gap-2">
          <h3 className="text-sm sm:text-base md:text-xl font-medium tracking-tighter shrink-0 text-zinc-700">
            Languages:
          </h3>
          <ul className="list-disc flex items-center gap-2">
            {book?.languages?.map((item: string, index: number) => (
              <li
                key={index}
                className="text-sm sm:text-base md:text-xl font-medium tracking-tighter line-clamp-1 text-zinc-500"
              >
                {item}
              </li>
            ))}
          </ul>
        </span>
        <span className="flex items-center gap-1">
          <h3 className="text-sm sm:text-base md:text-xl font-medium tracking-tighter shrink-0 text-zinc-700">
            Total Downloads:
          </h3>
          <h3 className="text-sm sm:text-base md:text-xl font-medium tracking-tighter line-clamp-1 text-zinc-500">
            {book?.download_count ? book?.download_count : "N/A"}
          </h3>
        </span>
      </div>
    </section>
  );
};

export default BookDetailsPage;
