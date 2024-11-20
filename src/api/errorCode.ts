export const ERROR_CODE = {
  Timeout: "요청을 수행하는 과정에 문제가 발생했어요.",
  "Network Error": "서버와의 연결에 실패했습니다.",
  "000": "서버와의 연결에 실패했습니다.",

  "400": "잘못된 요청입니다.",

  "401": "사용자 인증에 실패했어요.",
  "401101": "사용자 인증에 실패했어요.", // global scope
  "401201": "사용자 인증에 실패했어요.", // local scope
  "401301": "유효한 사용자 정보가 아니에요.",
  "401302": "유효한 사용자 정보가 아니에요.",
  "401303": "유효한 사용자 정보가 아니에요.",

  "403": "잘못된 요청입니다.",

  "404": "요청하신 정보를 찾을 수 없어요",
  "404101": "요청하신 정보를 찾을 수 없어요", // root scope
  "404201": "요청하신 정보를 찾을 수 없어요", // nested scope

  "500": "요청을 수행하는 과정에 문제가 발생했어요.",

  undefined: "요청을 수행하는 과정에 문제가 발생했어요.",
};

export type ErrorMessage = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];
export type ErrorCode = keyof typeof ERROR_CODE;
