import { _GET } from "@/api/rootAPI";
import { useQuery } from "@tanstack/react-query";

const RootPage = () => {
  const { data } = useQuery({
    queryKey: ["server-connect"],
    // queryFn: async () => await _GET("/?error=true"),
    queryFn: async () => await _GET<{ ok: boolean }>("/"),
    // throwOnError: false,
  });

  // console.log(data);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      어제 내 세상이 무너졌어...
    </div>
  );
};

export default RootPage;
