import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import LocalErrorFallback from "@/errors/LocalErrorFallback";

import Description from "@/pages/(cases)/_components/Description";
import OS from "@/pages/(cases)/_components/OS";

const DESCRIPTION = `지금 까지는 서버에서 제공하는 API 에서 발생할 수 있는 문제들을 ErrorBoundary 를 통해 대체 UI 를 보여주고 에러를 처리했습니다.\n
클라이언트의 잘못된 코드로 인해 발생하는 에러는 대부분 QA 단계를 통해 해결이 되기 때문에 클라이언트에서 발생할 수 있는 대부분의 에러는 서버와의 통신에서 발생한다고 합니다.\n
그럼에도 클라이언트 영역에서도 에러가 발생할 수 있으며, 제가 생각하기에 그러한 케이스로는 사용자의 OS 에 따라 동작하지 않을 수 있는 기능이 있는 경우입니다.\n
`;

const Case4Page = () => {
  return (
    <div className="relative flex flex-col flex-1 w-full">
      <h1 className="text-xl font-bold mb-8">
        CASE4 | 유저의 OS 환경에 따라 컴포넌트가 동작하지 않을 수 있다면?
      </h1>
      <Description description={DESCRIPTION} />
      <div className="flex flex-col w-full h-[150px]">
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <LocalErrorFallback
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <OS />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Case4Page;
