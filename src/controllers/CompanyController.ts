import {
  JsonController,
  Authorized, Get, Req, Res, CurrentUser, Param,
} from 'routing-controllers';
import { Inject } from 'typedi';
import { CompanyService } from '../service/CompanyService';
import { User } from '../entity/User';

@JsonController('/companies')
@Authorized()
export class CompanyController {

  @Inject()
  private companyService: CompanyService;

  @Get()
  public httpGetAll()  {
    return this.companyService.getAll();
  }

  @Get("/:slug")
  @Authorized()
  public async httpGetBySlug(@Param('slug') slug: string)  {
    return this.companyService.getBySlug(slug);
  }
}
