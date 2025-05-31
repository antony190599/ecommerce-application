import { createBrowserRouter } from "react-router";
import { default as Home} from "../screens/home";
import { default as ProductScreen} from "../screens/product";
import { default as NotFound } from "../screens/notFound";
import { default as CartScreen } from "../screens/cart";
import { default as AddQuantityButtonDemo } from "../screens/demo/AddQuantityButtonDemo";
import { default as CategoriesMenuScreen } from "../screens/demo/CategoriesMenuScreen";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/product/:productId",
      element: <ProductScreen />,
    },
    {
      path: "/demo/add-quantity-button",
      element: <AddQuantityButtonDemo />,
    },
    {
      path: "/demo/categories-menu",
      element: <CategoriesMenuScreen />,
    },
    {
      path: '/cart',
      element: <CartScreen />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);