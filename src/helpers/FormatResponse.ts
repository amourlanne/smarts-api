export class FormatResponse {
  public message : string|undefined;
  public data: Object|undefined;

  constructor(message: string|undefined, data: Object|undefined = undefined) {
    this.message = message;
    this.data = data;
  }
}
