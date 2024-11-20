import { http, HttpHandler, HttpResponse } from "msw";

import { BASE_URL } from "@/constants";
import { DetailResponse } from "../types";

export const getDetail: HttpHandler = http.get(
  `${BASE_URL}/case`,
  ({ request }) => {
    const url = new URL(request.url);
    const caseId = url.searchParams.get("case-id");

    if (caseId === "case1") return returnFailedData();

    if (caseId === "case2") return returnSuccessData();
  }
);

function returnFailedData() {
  return HttpResponse.json<DetailResponse>({
    ok: true,
    data: {
      title: "CASE1 | 만약에 요청한 정보에 해당하는 데이터가 없디면?",
      description: `다른 컴포넌트에서 특정 아이템을 클릭하여 들어온 컴포넌트이지만 데이터가 존재하지 않는다는 것은 무엇을 의미 하는 것일까요?\n
        아마도 해당 아이템의 디테일한 정보를 요청하는 URL 이 변경되었거나 하는 경우이지 않을까요?\n
        보여줄 수 있는 데이터가 있지만 보여줄 수 없는 경우는 Fatal Error 로 수집하면 좋을 것 같아요.`,
    },
  });
}

function returnSuccessData() {
  return HttpResponse.json<DetailResponse>({
    ok: true,
    data: {
      title: "CASE2 | 만약에 일부 데이터를 받아오는데 타임아웃이 걸린다면?",
      description: `전달 받은 API 의 일부 데이터를 이용해 다른 데이터를 불러와야하는 경우를 생각해볼까요?\n
      이때 추가 데이터를 응답 받는 과정에서 Timeout 이 발생한 것을 가정해볼게요.\n
      분명 이전 데이터는 잘 받아왔지만 추가 데이터를 받는 과정에서 Timeout 이 발생했다는 것은 서버와 클라이언트가 데이터를 주고 받는 과정에 네트워크 환경이 안좋았을 수도 있지만,
      추가 데이터를 서버 영역에서 처리하는 과정에 문제가 발생했을 가능성이 있으니 Warning Error 로 수집하면 좋을 것 같아요.`,
      flag: true,
    },
  });
}
