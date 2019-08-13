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

@JsonController("/users")
@Authorized()
export class UserController {

  @Inject()
  private userService: UserService;

  @Post()
  @Authorized(UserRole.Admin)
  public async httpPost(@Req() request: Request, @Res() response: Response, @Body({ validate: true }) user: User)  {

    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.save(user);
  }

  @Put()
  public async httpPut(@Req() request: Request, @Res() response: Response, @Body({ validate: true }) user: User)  {

    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.save(user);
  }

  @Get()
  @Authorized(UserRole.Admin)
  public async httpGetAll(@Req() request: Request, @Res() response: Response)  {
    return this.userService.getAll()
  }

  @Get("/:id")
  @OnUndefined(UserNotFoundError)
  public httpGetOne(@Param("id") id: string) {
    return this.userService.getById(id);
  }

  // @Delete('/:id')
  // public httpDelete(
  //   @Param('id') id: string,
  // ): Promise<void> {
  //   return this.userService.delete(id);
  // }
}
