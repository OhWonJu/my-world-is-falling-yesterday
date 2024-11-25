import { FallbackProps } from "react-error-boundary";

import { clientErrorLogger } from "@/lib/errorLoggers";

import NotFoundError from "./views/NotFoundError";
import TimeoutError from "./views/TimeoutError";

export const LocalErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  // API Error
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
      return <NotFoundError />;
    }
    case "Timeout": {
      return (
        <TimeoutError error={error} resetErrorBoundary={resetErrorBoundary} />
      );
    }
    case "500":
    case "undefined": {
      return (
        <section className="flex flex-col w-full h-full justify-center items-center">
          <p>예상하지 못한 문제가 발생했어요.</p>
          <button onClick={() => resetErrorBoundary()}>
            <span>다시 시도하기</span>
          </button>
        </section>
      );
    }
    default:
      // default 인 경우 api 에러가 아님
      break;
  }

  // client Error
  clientErrorLogger(error);

  return (
    <section className="flex flex-col w-full h-full justify-center items-center">
      <p>예상하지 못한 문제가 발생했어요.</p>
      <button onClick={() => resetErrorBoundary()}>
        <span>다시 시도하기</span>
      </button>
    </section>
  );
};

export default LocalErrorFallback;
