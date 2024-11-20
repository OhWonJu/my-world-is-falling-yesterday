import { FallbackProps } from "react-error-boundary";

export const TimeoutErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <section className="flex flex-col w-full h-full items-center justify-center">
      <p>정보를 가져오는데 문제가 발생했어요.</p>
      <p>잠시 후 다시 시도해주세요.</p>
      <button onClick={() => resetErrorBoundary()}>
        <span>다시 불러오기</span>
      </button>
    </section>
  );
};

export default TimeoutErrorFallback;
