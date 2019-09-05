import { User } from '../entity/User';
import { Request } from 'express';
import {
  Authorized,
  CurrentUser,
  Get,
  JsonController,
  Req,
  Res,
} from 'routing-controllers';
import { Inject } from 'typedi';
import {FormatResponse} from "../helpers/FormatResponse";
import { ProjectService } from '../service/ProjectService';

@JsonController("/projects")
@Authorized()
export class ProjectController {

  @Inject()
  private projectService: ProjectService;

  @Get()
  @Authorized()
  public async httpGetAll(@Req() request: Request, @Res() response: FormatResponse, @CurrentUser({ required: true }) user: User)  {
    if (user.isAdmin())
      return this.projectService.getAll();
    else
      return this.projectService.getAllByUser(user);
  }
}
