import {
  Column,
  Entity, ManyToOne,
  PrimaryGeneratedColumn, Unique,
} from "typeorm";
import {Length} from "class-validator";
import {Company} from "./Company";


@Entity("projects")
@Unique(["slug"])
export class Project {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Length(4, 20)
  slug: string;

  @ManyToOne(type => Company, company => company.projects)
  company: Company;

}
