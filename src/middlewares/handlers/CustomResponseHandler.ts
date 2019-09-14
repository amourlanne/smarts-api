import {Middleware, ExpressMiddlewareInterface} from "routing-controllers";
import {NextFunction, Request, Response} from 'express';

const wrapperResult = (data?: any) => {
  return data;
};

@Middleware({ type: "before" })
export class CustomResponseHandler implements ExpressMiddlewareInterface {

  use(request: Request, response: Response, next: NextFunction): void {
    const oldJsonResponse = response.json;
    response.json = function (data?: any) : Response {
      arguments[0]= wrapperResult(data);
      // @ts-ignore
      return oldJsonResponse.apply(response, arguments);
    };
    next();
  }

}
