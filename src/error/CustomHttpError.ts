import { HttpError } from 'routing-controllers';

export class CustomHttpError extends HttpError {
  constructor(code: number, name: string, message?: string) {
    super(code,message);
    this.name = name;
    Object.setPrototypeOf(this, CustomHttpError.prototype);
  }

  toJSON() {
    return {
      message: this.message,
      error: {
        code: this.httpCode,
        name: this.name,
      },
    };
  }
}
