import {Middleware, ExpressMiddlewareInterface} from "routing-controllers";
import {NextFunction, Request, Response} from "express";

export class AuthMiddleware implements ExpressMiddlewareInterface {

  use(request: Request, response: Response, next: NextFunction): void {

    let jwtPayload;

    //Try to validate the token and get data
    // try {
    //   jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    //   res.locals.jwtPayload = jwtPayload;
    // } catch (error) {
    //   //If token is not valid, respond with 401 (unauthorized)
    //   res.status(401).send();
    //   return;
    // }

    next();
  }

}