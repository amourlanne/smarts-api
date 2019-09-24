import { EntityRepository, FindConditions, ObjectLiteral, Repository } from 'typeorm';
import * as jwt from "jsonwebtoken";
import {User} from "../entity/User";
import config from "../config/security";
import { Service } from 'typedi';
import * as bcrypt from 'bcryptjs';

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public findByToken(token: string, jwtSecret: string, conditions: ObjectLiteral | undefined = undefined): Promise<User|undefined> {
    const { userId } = <any>jwt.verify(token, jwtSecret);
    return this.findOne({id: userId, ...conditions});
  }

  public async findByLogs(username: string, password: string, conditions: ObjectLiteral | undefined = undefined): Promise<User|undefined> {

    const user: User|undefined = await this.findOne({select: ['id', 'password'], where: [{username, ...conditions}, {email: username, ...conditions} ]});

    if(user && bcrypt.compareSync(password, user.password)) {
      return this.findOne({id : user.id, activated: true});
    }

    return undefined;
  }
}
