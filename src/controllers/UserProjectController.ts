import { User } from '../entity/User';
import {
  Authorized,
  CurrentUser,
  Get,
  JsonController, Param,
} from 'routing-controllers';
import { Inject } from 'typedi';
import { UserProjectService } from '../service/UserProjectService';

@JsonController("/user-project")
@Authorized()
export class UserProjectController {

  @Inject()
  private userProjectService: UserProjectService;

  @Get('/:slug')
  @Authorized()
  public async httpGetBySlug(@CurrentUser({ required: true }) user: User, @Param('slug') slug: string)  {
    return this.userProjectService.getBySlugAndUser(slug, user);
  }
}
