import {
  Column,
  Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import {Length} from "class-validator";
import {Company} from "./Company";
import {UserProject} from "./UserProject";
import { UserOrganization } from './UserOrganization';
import { User } from './User';
import { Project } from './Project';


@Entity("organizations")
@Unique(["slug"])
export class Organization {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Length(4, 20)
  slug: string;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.organizations)
  owner: User;

  @OneToMany(() => Project, project => project.organization)
  projects: Project[];

  @OneToMany(() => Company, company => company.organization)
  companies: Company[];

  @OneToMany(() => UserOrganization, (userOrganization) => userOrganization.organization)
  userOrganizations: UserOrganization[];
}
