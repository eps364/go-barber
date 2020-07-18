export default class Error {
  public readonly message: string;

  public readonly staticCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.staticCode = statusCode;
  }
}
