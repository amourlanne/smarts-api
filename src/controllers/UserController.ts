import { getCustomRepository, getRepository } from 'typeorm';
import { User, UserRole } from '../entity/User';
import { Request, Response } from 'express';
import {
  Authorized,
  CurrentUser,
  Get,
  JsonController,
  Post,
  Put,
  Req,
  Res,
  Body,
  Param,
  NotFoundError, Delete, OnUndefined,
} from 'routing-controllers';
import { UserRepository } from '../repository/UserRepository';
import { Inject } from 'typedi';
import { UserService } from '../service/UserService';
import { UserNotFoundError } from '../error/UserNotFoundError';
import {FormatResponse} from "../helpers/FormatResponse";

@JsonController("/users")
@Authorized()
export class UserController {

  @Inject()
  private userService: UserService;

  @Get("/me")
  @Authorized()
  public async httpGetMe(@CurrentUser({ required: true }) user: User)  {
    return user;
  }

  @Post()
  @Authorized(UserRole.ADMIN)
  public async httpPost(@Req() request: Request, @Res() response: FormatResponse, @Body({ validate: true }) user: User)  {

    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.save(user);
  }

  @Put()
  public async httpPut(@Req() request: Request, @Res() response: FormatResponse, @Body({ validate: true }) user: User)  {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.save(user);
  }

  @Get()
  public async httpGetAll(@Req() request: Request, @Res() response: FormatResponse)  {
    return await this.userService.getAll()
  }

  @Get("/:username")
  @OnUndefined(UserNotFoundError)
  public async httpGetByUsername(@Param("username") username: string) {
    return await this.userService.getByUsername(username);
  }

  // @Delete('/:id')
  // public httpDelete(
  //   @Param('id') id: string,
  // ): Promise<void> {
  //   return this.userService.delete(id);
  // }
}
