import { FallbackProps } from "react-error-boundary";

import { clientErrorLogger } from "@/lib/errorLoggers";

import AuthError from "./views/AuthError";
import ServiceError from "./views/ServiceError";

export const GlobalErrorFallback = ({ error }: FallbackProps) => {
  // API Error
  switch (error.errorCode) {
    case "401":
    case "401101":
    case "401201":
    case "401301":
    case "401302":
    case "401303": {
      return <AuthError errorCode={error.errorCode} />;
    }
    case "500":
    case "Timeout": {
      return <ServiceError errorCode={error.errorCode} />;
    }
    case "undefined": {
      return (
        <section className="flex flex-col justify-center items-center mx-auto h-[100dvh]">
          <p>이용에 불편을 드려 죄송합니다.</p>
          <button onClick={() => window.location.replace("/")}>
            <span>초기 페이지로 돌아가기</span>
          </button>
        </section>
      );
    }
    default:
      break;
  }

  // Client Error
  clientErrorLogger(error);

  return (
    <section className="flex flex-col justify-center items-center mx-auto h-[100dvh]">
      <p>이용에 불편을 드려 죄송합니다.</p>
      <button onClick={() => window.location.replace("/")}>
        <span>초기 페이지로 돌아가기</span>
      </button>
    </section>
  );
};

export default GlobalErrorFallback;
