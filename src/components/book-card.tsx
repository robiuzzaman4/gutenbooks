import { BookmarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { getWishlists } from "../utils/getWishlists";
import toast from "react-hot-toast";
import { Book } from "../types";
import { Link } from "react-router-dom";

type TBookCard = {
  book: Book;
  onRemove?: (bookId: number) => void;
};

const BookCard = ({ book, onRemove }: TBookCard) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  useEffect(() => {
    const wishlists = getWishlists();
    const isBookInWishlists = wishlists.some(
      (wishlist: Book) => wishlist.id === book.id
    );
    setIsWishlisted(isBookInWishlists);
  }, [book.id]);

  // handle toggle wishlist state and update localStorage
  const handleToggleWishlist = (id: number) => {
    const wishlists = getWishlists();
    if (isWishlisted) {
      // remove from wishlist
      const updatedWishlists = wishlists.filter(
        (wishlist: Book) => wishlist.id !== book.id
      );
      localStorage.setItem("wishlists", JSON.stringify(updatedWishlists));
      setIsWishlisted(false);
      toast.success("Remove from wishlist");
    } else {
      // add to wishlist
      const updatedWishlists = [...wishlists, book];
      localStorage.setItem("wishlists", JSON.stringify(updatedWishlists));
      setIsWishlisted(true);
      toast.success("Added to wishlist");
    }

    // onRemove function for remove from wishlists on wishlist page
    if (onRemove) {
      onRemove(id);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow hover:shadow-2xl flex flex-col gap-4 relative">
      {/* cover */}
      {book?.formats["image/jpeg"] ? (
        <img
          src={book?.formats["image/jpeg"]}
          alt="book cover"
          className="h-40 w-full object-cover rounded-md"
        />
      ) : (
        <div className="h-40 w-full bg-zinc-200 rounded-md grid place-items-center text-center text-xl font-medium">
          N/A
        </div>
      )}
      {/* details */}
      <div className="grid gap-1">
        <h3 className="text-base font-medium tracking-tighter truncate text-zinc-700">
          {book?.title}
        </h3>
        <span className="flex items-center gap-1">
          <h3 className="text-sm font-medium tracking-tighter shrink-0 text-zinc-700">
            Id:
          </h3>
          <h3 className="text-sm font-medium tracking-tighter line-clamp-1 text-zinc-500">
            {book?.id ? book?.id : "N/A"}
          </h3>
        </span>
        <span className="flex items-center gap-1">
          <h3 className="text-sm font-medium tracking-tighter shrink-0 text-zinc-700">
            Author:
          </h3>
          <h3 className="text-sm font-medium tracking-tighter line-clamp-1 text-zinc-500">
            {book?.authors[0]?.name ? book?.authors[0]?.name : "N/A"}
          </h3>
        </span>
        <span className="flex flex-col gap-1">
          <h3 className="text-sm font-medium tracking-tighter shrink-0 text-zinc-700">
            Genre:
          </h3>
          <ul className="list-disc">
            {book?.subjects?.map((item: string, index: number) => (
              <li
                key={index}
                className="text-sm font-medium tracking-tighter line-clamp-1 text-zinc-500"
              >
                {item}
              </li>
            ))}
          </ul>
        </span>
      </div>

      {/* view details button */}
      <Link
        to={`/books/${book?.id}`}
        className="button-secondary w-full mt-auto flex items-center justify-center"
      >
        View Details
      </Link>

      {/* wishlist button */}
      <button
        onClick={() => handleToggleWishlist(book?.id)}
        className={`h-9 w-9 rounded-full bg-white grid place-items-center border border-gray-200 absolute top-2 right-2`}
      >
        <BookmarkIcon
          className={`size-4 ${
            isWishlisted ? "text-blue-600" : "text-zinc-500"
          }`}
        />
      </button>
    </div>
  );
};

export default BookCard;
