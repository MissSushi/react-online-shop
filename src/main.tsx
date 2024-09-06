import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddproductView } from "./views/AddProductView";
import { ProductView } from "./views/ProductView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductView />,
  },
  {
    path: "/add-product",
    element: <AddproductView />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
