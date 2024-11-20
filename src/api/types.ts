export interface Response {
  ok: boolean;
  errorCode?: string;
  error?: string;
}

export interface DetailResponse extends Response {
  data: {
    title: string;
    description?: string;
    flag?: boolean;
  };
}

export interface DetailItemsResponse extends Response {
  data: string[];
}
