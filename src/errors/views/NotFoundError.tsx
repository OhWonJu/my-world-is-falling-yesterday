import { useNavigate } from "react-router-dom";

export const NotFoundError = () => {
  const navigate = useNavigate();

  return (
    <section className="absolute top-1/2 -translate-y-1/2 flex flex-col justify-center items-center w-full">
      <p>해당 정보를 찾을 수 없습니다.</p>
      <button onClick={() => navigate(-1)}>
        <span>이전 페이지로 돌아가기</span>
      </button>
    </section>
  );
};

export default NotFoundError;
