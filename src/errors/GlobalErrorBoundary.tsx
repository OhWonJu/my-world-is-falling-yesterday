import React, { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";

import GlobalErrorFallback from "./GlobalErrorFallback";

const GlobalErrorBoundary = ({ children }: PropsWithChildren<{}>) => {
  const location = useLocation();

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <GlobalErrorFallback
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}
      resetKeys={[location.pathname]}
    >
      {children}
    </ErrorBoundary>
  );
};

export default GlobalErrorBoundary;
