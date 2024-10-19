import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home";
import WishlistPage from "../pages/wishlist";
import BookDetailsPage from "../pages/book-details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
      },
      {
        path: "/books/:id",
        element: <BookDetailsPage />,
        loader: ({ params }) =>
          fetch(`https://gutendex.com/books/${params.id}`),
      },
    ],
  },
]);
