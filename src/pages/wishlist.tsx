import { useEffect, useState } from "react";
import BookCard from "../components/book-card";
import { getWishlists } from "../utils/getWishlists";
import { removeFromWishlist } from "../utils/removeFromWishlist";
import { Book } from "../types";

const WishlistPage = () => {
  const [wishlistedBooks, setWishlistedBooks] = useState<Book[]>([]);

  // fetch wishlisted books
  useEffect(() => {
    const wishlists = getWishlists();
    setWishlistedBooks(wishlists);
  }, []);

  // handler to remove a book from the wishlist and update the UI
  const handleRemove = (bookId: number) => {
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

      {wishlistedBooks?.length <= 0 && (
        <div className="w-full my-10 flex items-center justify-center">
          <h1 className="text-xl tracking-tighter">Your wishlist is empty!</h1>
        </div>
      )}

      {/* wishlisted books */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {wishlistedBooks &&
          wishlistedBooks?.length > 0 &&
          wishlistedBooks?.map((book: Book) => (
            <BookCard key={book?.id} book={book} onRemove={handleRemove} />
          ))}
      </div>
    </section>
  );
};

export default WishlistPage;
