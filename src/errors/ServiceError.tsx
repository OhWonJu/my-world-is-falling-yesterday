import React from "react";

import { ERROR_CODE, ErrorCode } from "@/api/errorCode";

interface ServiceErrorProps {
  errorCode: string;
}

const ServiceError = ({ errorCode }: ServiceErrorProps) => {
  return (
    <section className="flex flex-col justify-center items-center mx-auto h-[100dvh] space-y-4">
      <span>{ERROR_CODE[errorCode as ErrorCode]}</span>
      <span>잠시 후 다시 이용해주세요.</span>
      <span>이용에 불편을 드려 죄송합니다.</span>
    </section>
  );
};

export default ServiceError;
