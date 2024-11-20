import React from "react";
import { useQuery } from "@tanstack/react-query";

import { _GET } from "@/api/rootAPI";

interface FlagProps {
  flag: boolean;
}

const Flag = ({ flag }: FlagProps) => {
  const { data } = useQuery({
    queryKey: ["flag", "detailPage"],
    queryFn: async () => await _GET("/flag"),
    enabled: !flag,
  });

  return <></>;
};

export default Flag;
