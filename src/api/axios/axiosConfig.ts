import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { BASE_URL } from "@/constants";
import { ApiError } from "@/types/apiError";
import { apiErrorLogger } from "@/lib/errorLoggers";

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

    apiErrorLogger(errorObject, response.config, response);
    return Promise.reject(errorObject);
  }

  return response.data;
};

export const onError = (error: AxiosError) => {
  const response = error.response as AxiosResponse;

  let errorObject = null;

  if (error.message.includes("timeout of")) {
    errorObject = new ApiError(error.message, "Timeout", error.config);
  } else {
    errorObject = new ApiError(
      error.message,
      error.status.toString(),
      error.config
    );
  }

  apiErrorLogger(errorObject, error.config, response);
  return Promise.reject(errorObject);
};

export const onRequest = async (config: InternalAxiosRequestConfig) => {
  return config;
};
