import Reactƒ from "react";
import { useSearchParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useQuery, useQueryErrorResetBoundary } from "@tanstack/react-query";

import { _GET } from "@/api/rootAPI";
import { DetailResponse } from "@/api/types";

import LocalErrorFallback from "@/errors/LocalErrorFallback";

import Description from "@/pages/(cases)/_components/Description";
import DetailItems from "@/pages/(cases)/_components/DetailItems";
import Flag from "@/pages/(cases)/_components/Flag";

const Case1And2Page = () => {
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get("case");

  const { reset } = useQueryErrorResetBoundary();

  const { data, isLoading } = useQuery({
    queryKey: ["case", caseId],
    queryFn: async () => await _GET<DetailResponse>(`/case?case-id=${caseId}`),
    enabled: !!caseId,
  });

  if (isLoading) return null;
  const detailData = data.data;

  console.log(detailData.flag);

  return (
    <div className="relative flex flex-col flex-1 w-full">
      <h1 className="text-xl font-bold mb-8">{detailData.title}</h1>
      <Description description={detailData.description} />
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <LocalErrorFallback
            error={error}
            resetErrorBoundary={resetErrorBoundary}
          />
        )}
      >
        <Flag flag={detailData.flag} />
        {detailData.flag && (
          <div className="space-y-2 p-10">
            <strong>Item List</strong>
            <div className="border border-neutral-200 rounded-md w-full h-[140px] p-4">
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ error, resetErrorBoundary }) => (
                  <LocalErrorFallback
                    error={error}
                    resetErrorBoundary={resetErrorBoundary}
                  />
                )}
              >
                <DetailItems caseId={caseId} />
              </ErrorBoundary>
            </div>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default Case1And2Page;