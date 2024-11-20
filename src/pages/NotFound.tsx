import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center mx-auto h-[100dvh] space-y-4">
      <span>요청하신 페이지를 찾을 수 없습니다.</span>
    </div>
  );
};

export default NotFound;
