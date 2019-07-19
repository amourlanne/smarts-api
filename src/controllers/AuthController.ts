import {getCustomRepository, getRepository} from "typeorm";
import {User} from "../entity/User";
import { Request, Response } from 'express';
import * as jwt from "jsonwebtoken";
import {Get, JsonController, Req, Res, BodyParam, UnauthorizedError, Authorized} from "routing-controllers";
import config from "../config/config";
import {UserRepository} from "../repository/UserRepository";

@JsonController()
export class AuthController {

  @Authorized()
  @Get("/login")
  async login(@Req() request: Request, @Res() response: Response,
              @BodyParam("username", { required: true }) username: string,
              @BodyParam("password", { required: true }) password: string ) {

    const userRepository = getCustomRepository(UserRepository);

    let user: User;

    try {
      user = await userRepository.findOneOrFail({select: ['id', 'password'], where: [{username}, {email: username} ]});

      user.validateUnencryptedPasswordOfFail(password);
      user = await userRepository.findOneOrFail(user.id);

    } catch (e) {
      throw new UnauthorizedError('Bad credentials.')
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
        { userId: user.id, username: user.username },
        config.jwtSecret,
        { expiresIn: "1h" }
    );

    response.cookie('access_token', token);

    return user ;
  }
}