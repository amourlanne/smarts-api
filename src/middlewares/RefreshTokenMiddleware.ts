import { Middleware, ExpressMiddlewareInterface, CurrentUser } from 'routing-controllers';
import {NextFunction, Request, Response} from "express";
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { Inject } from 'typedi';
import { UserService } from '../service/UserService';

// @Middleware({ type: "after" }) // Can't set headers after they are sent.
export class RefreshTokenMiddleware implements ExpressMiddlewareInterface {

  @Inject()
  private userService: UserService;

  async use(request: Request, response: Response, next: NextFunction) {

    const token = request.cookies['access_token'];

    if(token) {
      const user = await this.userService.getByToken(token, config.jwtAuthSecret);

      if(user) {
        // Sing JWT, valid for 1 hour
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          config.jwtAuthSecret,
          { expiresIn: "1h" }
        );

        response.cookie('access_token', token, { expires: new Date(Date.now() + 3600000)});
      }
    }
    next();
  }
}
