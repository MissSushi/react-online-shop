import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddproductView } from "./views/AddProductView";
import { ProductView } from "./views/ProductView";
import { UpdateProductView } from "./views/UpdateProductView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductView />,
  },
  {
    path: "/add-product",
    element: <AddproductView />,
  },
  {
    path: "/update-product/:id",
    element: <UpdateProductView />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
