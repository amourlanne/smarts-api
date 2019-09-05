import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { Company } from '../entity/Company';

@Service()
@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
}
