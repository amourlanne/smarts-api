import {
  Column,
  Entity, ManyToOne, OneToMany,
  PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import {Length} from "class-validator";
import {Project} from "./Project";
import { User } from './User';
import { Organization } from './Organization';


@Entity("companies")
@Unique(["slug"])
export class Company {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Length(4, 20)
  slug: string;

  @OneToMany(type => Project, project => project.company)
  projects: Project[];

  @OneToMany(type => User, user => user.company)
  users: User[];

  @ManyToOne(type => Organization, organization => organization.companies)
  organization: Organization;

}
