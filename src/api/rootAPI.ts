import { axiosInstance } from "./axios/axiosInstance";

const rootAPI = axiosInstance;

export const _GET = async <T>(endPoint: string) => {
  const response = await rootAPI.get<T>(endPoint);
  return response;
};

export const _PATCH = async <T>(endPoint: string, params?: any) => {
  const response = await rootAPI.patch<T>(endPoint, params);
  return response;
};

export const _POST = async <T>(endPoint: string, params?: any) => {
  const response = await rootAPI.post<T>(endPoint, params);

  return response;
};

export const _PUT = async <T>(endPoint: string, params?: any) => {
  const response = await rootAPI.put<T>(endPoint, params);
  return response;
};

export const _DELETE = async <T>(endPoint: string, params: any) => {
  const response = await rootAPI.delete<T>(endPoint, {
    data: params,
  });
  return response;
};
