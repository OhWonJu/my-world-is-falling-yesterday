import { http, HttpHandler, HttpResponse } from "msw";

import { BASE_URL } from "@/constants";
import { MutationResponse } from "../axios/axiosInstance.types";
import { ERROR_CODE } from "../errorCode";

export const postSomething: HttpHandler = http.post(
  `${BASE_URL}/post`,
  async ({ request }) => {
    const body = (await request.json()) as { auth: string };

    if (body.auth === "true") {
      return HttpResponse.json<MutationResponse>({
        ok: false,
        errorCode: "401201",
        error: ERROR_CODE[401201],
      });
    }
    if (body.auth === "false") {
      return HttpResponse.json<MutationResponse>({
        ok: false,
        errorCode: "500",
        error: ERROR_CODE[500],
      });
    }
  }
);
