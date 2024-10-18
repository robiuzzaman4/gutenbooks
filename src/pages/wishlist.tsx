/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import BookCard from "../components/book-card";
import { getWishlists } from "../utils/getWishlists";
import { removeFromWishlist } from "../utils/removeFromWishlist";

const WishlistPage = () => {
  const [wishlistedBooks, setWishlistedBooks] = useState<any[]>([]);

  // fetch wishlisted books
  useEffect(() => {
    const wishlists = getWishlists();
    setWishlistedBooks(wishlists);
  }, []);

  // handler to remove a book from the wishlist and update the UI
  const handleRemove = (bookId: string) => {
    removeFromWishlist(Number(bookId));
    setWishlistedBooks((prevBooks) =>
      prevBooks.filter((book) => book.id !== bookId)
    );
  };

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-20 grid gap-8">
      <h1 className="text-3xl font-medium tracking-tighter">
        Wishlisted Books:
      </h1>

      {/* wishlisted books */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {wishlistedBooks &&
          wishlistedBooks?.length > 0 &&
          wishlistedBooks?.map((book: any) => (
            <BookCard key={book?.id} book={book} onRemove={handleRemove} />
          ))}
      </div>
    </section>
  );
};

export default WishlistPage;
