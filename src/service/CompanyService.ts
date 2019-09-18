import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CompanyRepository } from '../repository/CompanyRepository';
import { Company } from '../entity/Company';

@Service()
export class CompanyService {
  @InjectRepository() private companyRepository: CompanyRepository;

  public getAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  getBySlug(slug: string) {
    return this.companyRepository.findOne({ slug: slug});
  }
}
