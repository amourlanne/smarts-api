import {getCustomRepository, getRepository} from "typeorm";
import { User, UserRole } from '../entity/User';
import { Request, Response } from 'express';
import * as jwt from "jsonwebtoken";
import {
  JsonController,
  Res,
  BodyParam,
  Post,
  NotFoundError, Authorized,
} from 'routing-controllers';
import config from "../config/config";
import { Inject } from 'typedi';
import { UserService } from '../service/UserService';
import { MailerService } from '../service/MailerService';

@JsonController()
export class AuthController {

  @Inject()
  private userService: UserService;

  @Inject()
  private mailerService: MailerService;

  @Post("/login")
  async login(@Res() response: Response,
              @BodyParam("username", { required: true }) username: string,
              @BodyParam("password", { required: true }) password: string ) {

    const user: User|undefined = await this.userService.getByLogs(username, password);

    if(!user)
      throw new NotFoundError('Bad credentials');

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
        { userId: user.id, username: user.username },
        config.jwtAuthSecret,
        { expiresIn: "1h" }
    );

    response.cookie('access_token', token, { expires: new Date(Date.now() + 3600000)});

    return user;
  }

  // @Post("/register")
  // @Authorized(UserRole.Admin)
  // async register(@Res() response: Response,
  //             @BodyParam("username", { required: true }) username: string,
  //             @BodyParam("password", { required: true }) password: string ) {
  //
  //   const user: User|undefined = await this.userService.getByLogs(username, password);
  //
  //   if(!user)
  //     throw new NotFoundError('Bad credentials');
  //
  //   //Sing JWT, valid for 1 hour
  //   const token = jwt.sign(
  //     { userId: user.id, username: user.username },
  //     config.jwtAuthSecret,
  //     { expiresIn: "1h" }
  //   );
  //
  //   response.cookie('access_token', token, { expires: new Date(Date.now() + 3600000)});
  //
  //   return user;
  // }

  @Post("/reset-password")
  async resetPassword(@BodyParam("email", { required: true }) email: string) {

    const user: User|undefined = await this.userService.getOne({email});

    if(!user)
      return;

    const hash = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtAccountResetPasswordSecret,
    );

    let mailOptions = {
      template: 'reset-password',
      message: {
        from: 'Alexis Mourlanne <alexis.mourlanne@gmail.com>',
        to: user.email,
      },
      locals: {
        userName: user.username,
        hash: hash
      }
    };

    return this.mailerService.sendMail(mailOptions);
  }
}
