export class FormatResponse {
  public message : string;
  public data: Object|undefined;

  constructor(message: string, data: Object|undefined = undefined) {
    this.message = message;
    this.data = data;
  }
}