import { http, HttpHandler, HttpResponse } from "msw";

import { BASE_URL } from "@/constants";
import { DetailItemsResponse } from "../types";

export const getDetailItems: HttpHandler = http.get(
  `${BASE_URL}/items`,
  ({ request }) => {
    const url = new URL(request.url);

    setTimeout(() => {
      return HttpResponse.json<DetailItemsResponse>({
        ok: true,
        data: ["apple", "banana"],
      });
    }, 2000);
  }
);
