import { getDetail } from "../actions/getDetail";
import { getDetailItems } from "../actions/getDetailItems";
import { getNotFound } from "../actions/getNotFound";
import { getServerConnect } from "../actions/getServerConnect";
import { postSomething } from "../actions/postSomething";

export const handlers = [
  getServerConnect,
  getDetail,
  getDetailItems,
  postSomething,
  getNotFound,
];
