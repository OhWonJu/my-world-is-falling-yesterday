import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import Navigator from "./components/Navigator";
import GlobalErrorFallback from "./errors/GlobalErrorFallback";

const RootLayout = () => {
  const location = useLocation();

  return (
    <div className="relative flex flex-col max-w-xl h-screen items-center mx-auto">
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <GlobalErrorFallback
            error={error}
            resetErrorBoundary={resetErrorBoundary}
          />
        )}
        resetKeys={[location.pathname]}
      >
        <main className="flex flex-1 w-full py-[60px]">
          <Outlet />
        </main>
      </ErrorBoundary>
      <Navigator pathName={location.pathname.split("/")[1]} />
    </div>
  );
};

export default RootLayout;
