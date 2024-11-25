interface ErrorParams {
  name: string;
  message: string;
}

export class ClientError extends Error {
  constructor(error: ErrorParams) {
    super(error.name);
    this.name = error.name;
    this.message = error.message;
  }
}
