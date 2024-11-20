import React from "react";
import { useMutation } from "@tanstack/react-query";

import { _POST } from "@/api/rootAPI";
import { MutationResponse } from "@/api/axios/axiosInstance.types";

interface RequestButtonProps {
  isRequireAuthentication?: boolean;
}

const RequestButton = ({
  isRequireAuthentication = false,
}: RequestButtonProps) => {
  const { mutate } = useMutation({
    mutationFn: async () =>
      await _POST<MutationResponse>("/post", {
        auth: isRequireAuthentication ? "true" : "false",
      }),
    throwOnError: true,
  });

  return (
    <button
      className="p-3 bg-neutral-100 hover:bg-neutral-200 rounded-md mb-8"
      onClick={() => mutate()}
    >
      {isRequireAuthentication ? "사용자 인증이 필요한 요청" : "일반 요청"}
    </button>
  );
};

export default RequestButton;
