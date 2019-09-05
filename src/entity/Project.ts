import {
  Column,
  Entity, ManyToOne, OneToMany,
  PrimaryGeneratedColumn, Unique,
} from "typeorm";
import {Length} from "class-validator";
import {Company} from "./Company";
import {UserProject} from "./UserProject";


@Entity("projects")
@Unique(["slug"])
export class Project {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Length(4, 20)
  slug: string;

  @Column()
  name: string;

  @ManyToOne(type => Company, company => company.projects)
  company: Company;

  @OneToMany((type) => UserProject, (userProject) => userProject.project)
  public userProjects: UserProject[];

}
