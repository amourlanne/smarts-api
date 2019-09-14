import { User } from '../entity/User';
import { Request } from 'express';
import {
  Authorized,
  CurrentUser,
  Get,
  JsonController, Param,
  Req,
  Res,
} from 'routing-controllers';
import { Inject } from 'typedi';
import {FormatResponse} from "../helpers/FormatResponse";
import { ProjectService } from '../service/ProjectService';
import { UserService } from '../service/UserService';

@JsonController("/projects")
@Authorized()
export class ProjectController {

  @Inject()
  private projectService: ProjectService;

  @Inject()
  private userService: UserService;

  @Get()
  @Authorized()
  public async httpGetAll(@Req() request: Request, @Res() response: FormatResponse, @CurrentUser({ required: true }) user: User)  {
    console.log(user)
    if (user.isAdmin()) {
      return this.projectService.getAll();
    } else {
      return this.projectService.getAllByUser(user);
    }
  }

  @Get("/:slug")
  @Authorized()
  public async httpGetBySlug(@CurrentUser({ required: true }) user: User, @Param('slug') slug: string)  {
    if(user.isAdmin()) {
      return this.projectService.getBySlug(slug);
    }
    return this.projectService.getBySlugAndUser(slug, user);
  }

  @Get("/:slug/users")
  @Authorized()
  public async httpGetUsersBySlug(@CurrentUser({ required: true }) user: User, @Param('slug') slug: string) {

    if (user.isAdmin()) {
      return this.userService.getAllByProject(slug);
    }

    const project = await this.projectService.getBySlugAndUser(slug, user);

    if (project) {
      return this.userService.getAllByProject(slug);
    }

    return undefined;
  }
}
