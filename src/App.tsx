import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Pages/home";
import { Cart } from "./Pages/cart/index";
import { Layout } from "./components/Header/layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/cart", element: <Cart /> },
    ],
  },
]);

export { router };
