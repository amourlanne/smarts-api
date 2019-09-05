import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CompanyRepository } from '../repository/CompanyRepository';

@Service()
export class CompanyService {
  @InjectRepository() private companyRepository: CompanyRepository;
}
