import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { UserProject } from '../entity/UserProject';

@Service()
@EntityRepository(UserProject)
export class UserProjectRepository extends Repository<UserProject> {
}
