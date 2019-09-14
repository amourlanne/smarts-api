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
  GUEST = 'PROJECT_ROLE_GUEST',
  DEVELOPER = 'PROJECT_ROLE_DEVELOPER',
}

@Entity("user_projects")
export class UserProject {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;
  projectId: string;

  @Column({
    type: "enum",
    enum: UserProjectRole,
    default: UserProjectRole.DEVELOPER
  })
  @IsEnum(UserProjectRole) // Not working
  role: UserProjectRole;

  @ManyToOne(type => User, user => user.userProjects)
  user: User;

  @ManyToOne(type => Project, project => project.userProjects)
  project: Project;
}
