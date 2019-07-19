import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";
import config from "../config/config";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

}