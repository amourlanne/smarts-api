import {
  Entity, JoinColumn, OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {Company} from "./Company";


@Entity("application_settings")
export class ApplicationSettings {

  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(type => Company)
  @JoinColumn()
  company: Company;

}
