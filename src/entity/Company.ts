import {
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn, Unique,
} from "typeorm";
import {Length} from "class-validator";
import {Project} from "./Project";
import { User } from './User';


@Entity("companies")
export class Company {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(type => Project, project => project.company)
  projects: Project[];

  @OneToMany(type => User, user => user.company)
  users: User[];

}
