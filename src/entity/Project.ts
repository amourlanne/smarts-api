import {
  Column,
  Entity, ManyToOne, OneToMany,
  PrimaryGeneratedColumn, Unique,
} from "typeorm";
import {Length} from "class-validator";
import {Company} from "./Company";
import {UserProject} from "./UserProject";
import { User } from './User';
import { Organization } from './Organization';


@Entity("projects")
@Unique(["organization","slug"])
export class Project {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Length(4, 20)
  slug: string;

  @Column()
  name: string;

  @ManyToOne(() => Company, company => company.projects)
  company: Company;

  @ManyToOne(() => User, user => user.projects)
  owner: User;

  @ManyToOne(() => Organization, organization => organization.projects)
  organization: Organization;

  @OneToMany(() => UserProject, (userProject) => userProject.project)
  userProjects: UserProject[];

}
