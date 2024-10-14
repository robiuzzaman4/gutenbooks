import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home";
import WishlistPage from "../pages/wishlist";

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
    ],
  },
]);
