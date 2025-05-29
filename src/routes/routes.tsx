import { createBrowserRouter } from "react-router";
import { default as Home} from "../screens/home";
import { default as NotFound } from "../screens/notFound";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);