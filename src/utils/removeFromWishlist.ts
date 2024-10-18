/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWishlists } from "./getWishlists";

// Remove book from localStorage
export const removeFromWishlist = (bookId: number) => {
  const wishlists = getWishlists();
  const updatedWishlists = wishlists?.filter(
    (wishlist: any) => wishlist.id !== bookId
  );
  localStorage.setItem("wishlists", JSON.stringify(updatedWishlists));
};
