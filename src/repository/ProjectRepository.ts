import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { Project } from '../entity/Project';

@Service()
@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
}
