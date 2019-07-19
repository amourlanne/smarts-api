import {getRepository} from "typeorm";
import {User} from "../entity/User";
import { Request, Response } from 'express';
import {Get, JsonController, Req, Res} from "routing-controllers";

@JsonController("/users")
export class UserController {

  @Get()
  async getAll(@Req() request: Request, @Res() response: Response)  {
    const userRepository = getRepository(User);

    let users: User[];

    users = await userRepository.find();

    return users;
  }
}