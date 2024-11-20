import * as Sentry from "@sentry/react";

import { ApiError } from "./axios/axiosConfig";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export default function errorLogger(
  error: ApiError,
  originalRequest: InternalAxiosRequestConfig,
  response: AxiosResponse
) {
  // console.log(
  //   "ErrorLoggin -",
  //   ERROR_CODE[error.errorCode as ErrorCode],
  //   error.message,
  //   error.errorCode
  // );

  console.log(originalRequest);
  console.log(response);

  switch (error.errorCode) {
    case "Timeout": {
      Sentry.withScope((scope: Sentry.Scope) => {
        scope.setTag("api", "network");
        scope.setLevel("info");
        scope.setFingerprint([
          originalRequest.method,
          error.errorCode,
          originalRequest.url,
        ]);
        scope.setTransactionName(originalRequest.url);

        Sentry.captureException(error);
      });
      break;
    }
    case "401201": {
      Sentry.withScope((scope: Sentry.Scope) => {
        scope.setTag("api", "authentication");
        scope.setLevel("error");
        scope.setFingerprint([
          originalRequest.method,
          error.errorCode,
          originalRequest.url,
        ]);
        scope.setTransactionName(originalRequest.url);
        Sentry.setContext("API Request Detail", {
          method: originalRequest.method,
          url: originalRequest.url,
          params: originalRequest.params,
          data: originalRequest.data,
          headers: originalRequest.headers,
        });
        Sentry.setContext("API Response Info", {
          data: JSON.stringify(response.data, null, 2),
          headers: response.headers,
        });

        Sentry.captureException(error);
      });
      break;
    }
    case "404201": {
      Sentry.withScope((scope: Sentry.Scope) => {
        scope.setTag("api", "notFound");
        scope.setLevel("warning");
        scope.setFingerprint([
          originalRequest.method,
          error.errorCode,
          originalRequest.url,
        ]);
        scope.setTransactionName(originalRequest.url);
        Sentry.setContext("API Request Detail", {
          method: originalRequest.method,
          url: originalRequest.url,
          params: originalRequest.params,
          data: originalRequest.data,
          headers: originalRequest.headers,
        });
        Sentry.setContext("API Response Info", {
          data: JSON.stringify(response.data, null, 2),
          headers: response.headers,
        });

        Sentry.captureException(error);
      });
      break;
    }
    case "500": {
      Sentry.withScope((scope: Sentry.Scope) => {
        scope.setTag("api", "internalServerError");
        scope.setLevel("fatal");
        scope.setFingerprint([
          originalRequest.method,
          error.errorCode,
          originalRequest.url,
        ]);
        scope.setTransactionName(originalRequest.url);
        Sentry.setContext("API Request Detail", {
          method: originalRequest.method,
          url: originalRequest.url,
          params: originalRequest.params,
          data: originalRequest.data,
          headers: originalRequest.headers,
        });
        Sentry.setContext("API Response Info", {
          data: JSON.stringify(response.data, null, 2),
          headers: response.headers,
        });

        Sentry.captureException(error);
      });
      break;
    }
  }
}
