import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import LocalErrorFallback from "@/errors/LocalErrorFallback";

import Description from "@/pages/(cases)/_components/Description";
import RequestButton from "@/pages/(cases)/_components/RequestButton";

const DESCRIPTION = `유저의 POST, PATCH, PUT 과 같은 요청의 결과를 응답을 전달하는 경우에도 에러가 발생할 수 있을 것 입니다.\n
유저가 잘못된 정보를 기입하여 발생하는 에러도 분명 있겠지만 (이 경우 UI 를 통해 잘못된 방식임을 알리고 에러 수집을 하지 않아도 될 것 같습니다.)
올바른 요청임에도 결과를 전달할 수 없는 경우 에러를 수집하는 것이 좋아 보입니다.\n
일반적으로 POST 등의 응답은 에러가 발생할 수 없지만 커스텀 에러를 통해 에러가 발생했음을 알릴 수 있습니다.
`;

const Case3Page = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <div className="relative flex flex-col flex-1 w-full">
      <h1 className="text-xl font-bold mb-8">
        CASE3 | 유저의 요청(Mutation) 이 실패한 경우라면?
      </h1>
      <Description description={DESCRIPTION} />
      <div className="flex flex-col w-full h-[150px]">
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <LocalErrorFallback
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <RequestButton />
          <RequestButton isRequireAuthentication={true} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Case3Page;
