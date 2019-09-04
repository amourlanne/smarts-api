import {
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn, Unique,
} from "typeorm";
import {Length} from "class-validator";
import {Project} from "./Project";


@Entity("companies")
export class Company {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(type => Project, project => project.company)
  projects: Project[];

}
