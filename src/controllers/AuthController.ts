import {getCustomRepository, getRepository} from "typeorm";
import { User, UserRole } from '../entity/User';
import { Request, Response } from 'express';
import * as jwt from "jsonwebtoken";
import {
  JsonController,
  Res,
  BodyParam,
  Post,
  NotFoundError, Authorized, Param, Body, QueryParam, Get, CurrentUser,
} from 'routing-controllers';
import config from "../config/security";
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

  @Post("/signup")
  @Authorized(UserRole.ADMIN)
  async signUp(@Body({ validate: true }) user: User,
               @QueryParam('sendPassword') sendPassword: boolean) {

    const password = user.password;

    await this.userService.save(user);

    const token = jwt.sign(
        { userId: user.id, username: user.username },
        config.jwtAccountConfirmationSecret,
        { expiresIn: "30d" }
    );

    let mailOptions = {
      template: 'welcome-onboard',
      message: {
        from: 'Alexis Mourlanne <alexis.mourlanne@gmail.com>',
        to: user.email,
      },
      locals: {
        userName: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: token,
        password: sendPassword ? password : '*'.repeat(password.length)
      }
    };

    await this.mailerService.sendMail(mailOptions);

    delete user.password;

    return user;
  }

  @Post("/verification")
  async verification(@QueryParam('token', { required: true }) token: string) {

    const user: User|undefined = await this.userService.getByToken(token, config.jwtAccountConfirmationSecret, false);

    if(!user)
      throw new Error('Not have account associate to this token.');

    if(!user.activated) {
      user.activated = true;
      await this.userService.save(user);
    }

    return user;
  }

  @Post("/request-password")
  async requestPassword(@QueryParam("email", { required: true }) email: string) {

    const user: User|undefined = await this.userService.getOne({email});

    if(!user)
      return;

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtResetPasswordSecret,
      { expiresIn: "1h" }
    );

    let mailOptions = {
      template: 'reset-password',
      message: {
        from: 'Alexis Mourlanne <alexis.mourlanne@gmail.com>',
        to: user.email,
      },
      locals: {
        userName: user.username,
        token: token
      }
    };
    const {response} = await this.mailerService.sendMail(mailOptions);
    return response;
  }

  @Post("/reset-password")
  async resetPassword(@QueryParam('token', { required: true }) token: string,
                      @BodyParam('password', { required: true }) password: string,
                      @BodyParam('confirmPassword', { required: true }) confirmPassword : string) {

    if (password !== confirmPassword)
      throw new Error('Password are not the same.');

    const user: User|undefined = await this.userService.getByToken(token, config.jwtResetPasswordSecret);

    if(!user)
      throw new Error('Not have account associate to this token.');

    user.password = password;
    user.hashPassword();

    await this.userService.save(user);

    return "Password succefully changed."
  }

  @Get("/account")
  @Authorized()
  public async httpGetAccount(@CurrentUser({ required: true }) user: User)  {
    return user;
  }
}
