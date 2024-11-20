import { http, HttpHandler, HttpResponse } from "msw";

import { BASE_URL } from "@/constants";
import { ERROR_CODE } from "../errorCode";

export const getServerConnect: HttpHandler = http.get(
  `${BASE_URL}/`,
  ({ request }) => {
    const url = new URL(request.url);
    const isError = url.searchParams.get("error");

    if (isError === "true")
      setTimeout(() => {
        return HttpResponse.json({
          ok: false,
          errorCode: "000",
          error: ERROR_CODE["000"],
        });
      }, 5000);
    else return HttpResponse.json({ ok: true });
  }
);
