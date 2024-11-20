import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./RootLayout";
import RootPage from "./pages/(root)/page";
import Case1And2Page from "./pages/(cases)/(routes)/cases/[case1-2]/page";
import Case3Page from "./pages/(cases)/(routes)/cases/case3/page";
import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/NotFound";
import Case4Page from "./pages/(cases)/(routes)/cases/case4/page";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <RootPage />,
      },
      {
        path: "/cases/case1",
        element: <Case1And2Page />,
      },
      {
        path: "/cases/case2",
        element: <Case1And2Page />,
      },
      {
        path: "/cases/case3",
        element: <Case3Page />,
      },
      {
        path: "/cases/case4",
        element: <Case4Page />,
      },
      {
        path: "/access-denied",
        element: <AccessDenied />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
