import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import * as Sentry from "@sentry/react";

import { ApiError } from "@/types/apiError";
import { ClientError } from "@/types/clientError";

export function apiErrorLogger(
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

  // console.log(originalRequest);
  // console.log(response);

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
    case "404": {
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

export function clientErrorLogger(error: any) {
  const clientError = new ClientError(error);
  let tagValue: string = "";
  let level: Sentry.SeverityLevel = "error";

  // GlobalErrorBoundary 를 통해 전체 UI 를 대체 해야하는 경우 - throw
  switch (clientError.name) {
    case "Error":
      tagValue = "Error";
      break;
    case "RangeError":
      tagValue = "RangeError";
      level = "fatal";
      break;
    case "ReferenceError":
      tagValue = "ReferenceError";
      level = "warning";
      break;
    case "SyntaxError":
      tagValue = "SyntaxError";
      level = "warning";
      break;
    case "TypeErrror":
      level = "info";
      tagValue = "TypeErrror";
      break;
    case "URIError":
      tagValue = "URIError";
      level = "info";
      break;
    case "AggregateError":
      tagValue = "AggregateError";
      level = "info";
      break;
    case "InternalError":
      tagValue = "InternalError";
      level = "info";
      break;
  }

  Sentry.withScope((scope: Sentry.Scope) => {
    scope.setTag("client", tagValue);
    scope.setLevel(level);
    Sentry.captureException(clientError);
  });
}
