import React from "react";
import { useQuery } from "@tanstack/react-query";

import { _GET } from "@/api/rootAPI";
import { DetailItemsResponse } from "@/api/types";

interface DetailItemsProps {
  caseId: string;
}

const DetailItems = ({ caseId }: DetailItemsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["items", caseId],
    queryFn: async () =>
      await _GET<DetailItemsResponse>(`/items?case-id=${caseId}`),
    enabled: !!caseId,
  });

  if (isLoading)
    return (
      <span className="w-full h-full grid place-content-center">
        loading...
      </span>
    );

  if (!data) return null;

  const detailItems = data.data;

  return (
    <ul className="flex gap-2">
      {detailItems.map((data, index) => (
        <li
          key={index}
          className="flex justify-center items-center w-[200px] h-[80px] bg-neutral-200 rounded-md"
        >
          {data}
        </li>
      ))}
    </ul>
  );
};

export default DetailItems;
