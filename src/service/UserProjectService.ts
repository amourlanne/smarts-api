import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../entity/User';
import { UserProject } from '../entity/UserProject';
import { UserProjectRepository } from '../repository/UserProjectRepository';

@Service()
export class UserProjectService {
  @InjectRepository() private userProjectRepository: UserProjectRepository;

  public getBySlugAndUser(slug: string, user: User): Promise<UserProject | undefined> {
    return this.userProjectRepository
      .createQueryBuilder('userProject')
      .innerJoinAndSelect('userProject.project', 'project')
      .innerJoin('userProject.user', 'user')
      .where('user.id = :id', { id: user.id })
      .andWhere('project.slug = :slug', { slug: slug })
      .getOne();
  }
}
