export const getWishlists = () => {
  const savedWishlists = localStorage.getItem("wishlists");
  return savedWishlists ? JSON.parse(savedWishlists) : [];
};
