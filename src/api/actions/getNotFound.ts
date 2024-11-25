import { http, HttpHandler, HttpResponse } from "msw";

import { BASE_URL } from "@/constants";
import { Response } from "../types";
import { ERROR_CODE } from "../errorCode";

export const getNotFound: HttpHandler = http.get(`${BASE_URL}/flag`, () => {
  return new HttpResponse(null, {
    status: 404,
  });

  // return HttpResponse.json<Response>({
  //   ok: false,
  //   errorCode: "404201",
  //   error: ERROR_CODE["404201"],
  // });
});
