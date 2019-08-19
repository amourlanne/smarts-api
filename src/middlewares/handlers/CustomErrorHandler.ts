import {Middleware, ExpressErrorMiddlewareInterface} from "routing-controllers";
import {NextFunction, Request, Response} from "express";
import {CustomHttpError} from "../../error/CustomHttpError";

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

  error(error: any, request: Request, response: Response, next: NextFunction) {
    const httpCode: number = error.httpCode || error.status || 500;
    const customError = new CustomHttpError(httpCode, error.name, error.message);
    return response
        .status(httpCode)
        .json(customError);
  }

}