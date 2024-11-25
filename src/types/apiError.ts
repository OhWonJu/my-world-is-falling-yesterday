import { AxiosError, InternalAxiosRequestConfig } from "axios";

import { ErrorCode } from "@/api/errorCode";

export class ApiError extends AxiosError {
  errorCode: string;

  constructor(
    message: string,
    errorCode: string,
    config?: InternalAxiosRequestConfig
  ) {
    super(message, errorCode, config);
    this.errorCode = errorCode;
    this.config = config ?? null;

    let name = "ApiError";

    switch (errorCode as ErrorCode) {
      case "Timeout":
        name = "ApiTimeout";
        break;
      case "400": // 400
        name = "ApiBadRequestError";
        break;
      case "401":
      case "401101":
      case "401201":
      case "401301":
      case "401302":
      case "401303":
        name = "ApiUnauthorizedError";
        break;
      case "403": // 403
        name = "ApiForbiddenError";
        break;
      case "404": // 404
      case "404101":
      case "404201":
        name = "ApiNotFoundError";
        break;
      case "500": // 500
        name = "ApiInternalServerError";
        break;
    }

    this.name = name;
  }
}
