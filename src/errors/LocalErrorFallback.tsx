import { FallbackProps } from "react-error-boundary";

import TimeoutErrorFallback from "./TimeoutErrorFallback";
import NotFoundErrorFallback from "./NotFoundErrorFallback";

export const LocalErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  switch (error.errorCode) {
    case "Network Error":
    case "000":
    case "401":
    case "401101":
    case "401201":
    case "401301":
    case "401302":
    case "401303": {
      throw error;
    }
    case "404": {
      return <NotFoundErrorFallback />;
    }
    case "Timeout": {
      return (
        <TimeoutErrorFallback
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      );
    }
    case "500": {
      return (
        <section className="flex flex-col w-full h-full justify-center items-center">
          <p>예상하지 못한 문제가 발생했어요.</p>
          <button onClick={() => resetErrorBoundary()}>
            <span>다시 시도하기</span>
          </button>
        </section>
      );
    }
    case "undefined":
    default: {
      return (
        <section className="flex flex-col w-full h-full justify-center items-center">
          <p>예상하지 못한 문제가 발생했어요.</p>
          <button onClick={() => resetErrorBoundary()}>
            <span>다시 시도하기</span>
          </button>
        </section>
      );
    }
  }
};

export default LocalErrorFallback;
