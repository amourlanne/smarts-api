import { Inject, Service } from 'typedi';
import { User } from '../entity/User';
import { UserRepository } from '../repository/UserRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { FindConditions, ObjectLiteral } from 'typeorm';

@Service()
export class UserService {
  @InjectRepository() private userRepository: UserRepository;

  // public create(props: User): Promise<User> {
  //   return this.userRepository.persist(props);
  // }
  //
  // public getAll(size: number = 10, page: number = 1): Promise<[User[], number]> {
  //   const skip: number = size * (page - 1);
  //
  //   return this.userRepository.findAndCount({
  //     skip,
  //     take: page
  //   });
  // }

  public getAll(): Promise<User[]> {
    return this.userRepository.find({activated: true});
  }

  public getById(id: string): Promise<User|undefined> {
    return this.userRepository.findOne({id, activated: true});
  }

  public getOne(conditions?: FindConditions<User>): Promise<User|undefined> {
    return this.userRepository.findOne(conditions);
  }

  public async getByLogs(username: string, password: string): Promise<User|undefined> {
      return this.userRepository.findByLogs(username, password);
  }

  public getByToken(token: string, jwtSecret: string, onlyActivated: boolean = true): Promise<User|undefined> {
    return this.userRepository.findByToken(token, jwtSecret, onlyActivated ? {activated: true} : {});
  }

  public save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  // public delete(id: string): Promise<void> {
  //   return this.userRepository.removeById(id);
  // }

}
