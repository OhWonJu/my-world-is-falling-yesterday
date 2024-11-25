import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navigator from "./components/Navigator";
import GlobalErrorBoundary from "./errors/GlobalErrorBoundary";

const RootLayout = () => {
  const location = useLocation();

  return (
    <div className="relative flex flex-col max-w-xl h-screen items-center mx-auto">
      <GlobalErrorBoundary>
        <main className="flex flex-1 w-full py-[60px]">
          <Outlet />
        </main>
      </GlobalErrorBoundary>
      <Navigator pathName={location.pathname.split("/")[1]} />
    </div>
  );
};

export default RootLayout;
