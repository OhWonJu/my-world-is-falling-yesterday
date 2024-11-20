import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { BASE_URL } from "@/constants";
import errorLogger from "../errorLogger";
import { ErrorCode } from "../errorCode";

export class ApiError extends Error {
  errorCode: string;
  config?: InternalAxiosRequestConfig | null;

  constructor(
    message: string,
    errorCode: string,
    config?: InternalAxiosRequestConfig
  ) {
    super(message);
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

export const axiosConfig = {
  baseURL: BASE_URL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    accept: "application/json",
    // "Content-Type": "application/x-www-form-urlencoded",
    "Content-Type": "application/json",
  },
};

export const onResponse = (response: AxiosResponse) => {
  if (response.data.errorCode) {
    const errorObject = new ApiError(
      response.data.error,
      response.data.errorCode,
      response.config
    );

    errorLogger(errorObject, response.config, response);
    return Promise.reject(errorObject);
  }

  return response.data;
};

export const onError = (error: AxiosError) => {
  const response = error.response as AxiosResponse;

  if (error.message.includes("timeout of")) {
    const errorObject = new ApiError(error.message, "Timeout", error.config);

    errorLogger(errorObject, error.config, response);
    return Promise.reject(errorObject);
  }

  if (response?.data) {
    const errorObject = new ApiError(
      response.data.message,
      response.data.statusCode,
      error.config
    );

    errorLogger(errorObject, error.config, response);
    return Promise.reject(errorObject);
  }

  return Promise.reject(error);
};

export const onRequest = async (config: InternalAxiosRequestConfig) => {
  return config;
};
