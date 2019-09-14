import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ProjectRepository } from '../repository/ProjectRepository';
import { Project } from '../entity/Project';
import { User } from '../entity/User';
import { UserProject } from '../entity/UserProject';

@Service()
export class ProjectService {
  @InjectRepository() private projectRepository: ProjectRepository;

  public getAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  public getAllByUser(user: User): Promise<Project[]> {
    return this.projectRepository
      .createQueryBuilder('project')
      .innerJoin('project.userProjects', 'userProject')
      .innerJoin('userProject.user', 'user')
      .where('user.id = :id', { id: user.id })
      .getMany();
  }

  public getBySlugAndUser(slug: string, user: User): Promise<Project | undefined> {
    return this.projectRepository
      .createQueryBuilder('project')
      .innerJoin('project.userProjects', 'userProject')
      .innerJoin('userProject.user', 'user')
      .where('user.id = :id', { id: user.id })
      .andWhere('project.slug = :slug', { slug: slug })
      .getOne();
  }

  getBySlug(slug: string) {
    return this.projectRepository.findOne({ slug: slug});
  }
}
