import React, { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

import LocalErrorFallback from "./LocalErrorFallback";

interface LocalErrorBoundaryProps {
  onReset?: any;
}

const LocalErrorBoundary = ({
  children,
  onReset,
}: PropsWithChildren<LocalErrorBoundaryProps>) => {
  return (
    <ErrorBoundary
      onReset={onReset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <LocalErrorFallback
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default LocalErrorBoundary;
