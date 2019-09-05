import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne, Column,
} from 'typeorm';
import {User, UserRole} from "./User";
import {Project} from "./Project";
import {IsEnum, IsNotEmpty} from "class-validator";

// TODO: export this class to customise it
export enum UserProjectRole {
  Guest = 'PROJECT_ROLE_GUEST',
  Developer = 'PROJECT_ROLE_USER',
}

@Entity("user_projects")
export class UserProject {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;
  projectId: string;

  @Column()
  @IsEnum(UserProjectRole) // Not working
  role: UserProjectRole;

  @ManyToOne(type => User, user => user.userProjects)
  user: User;

  @ManyToOne(type => Project, project => project.userProjects)
  project: Project;
}
