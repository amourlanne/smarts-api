import {
  Column,
  Entity, Index, ManyToOne, OneToMany,
  PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { IsEnum, Length } from 'class-validator';
import {Company} from "./Company";
import { UserProject, UserProjectRole } from './UserProject';
import { User } from './User';
import { Project } from './Project';
import { Organization } from './Organization';

export enum UserOrganisationRole {
  ADMIN = 'ORGANIZATION_ROLE_ADMIN',
  USER = 'ORGANIZATION_ROLE_USER',
}

@Entity("user_organizations")
@Unique(["user", "organization"])
export class UserOrganization {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;
  organizationId: string;

  @Column({
    type: "enum",
    enum: UserOrganisationRole,
    default: UserOrganisationRole.USER
  })
  @IsEnum(UserOrganisationRole)
  role: UserOrganisationRole;

  @ManyToOne(type => User, user => user.userOrganizations)
  user: User;

  @ManyToOne(type => Organization, organization => organization.userOrganizations)
  organization: Organization;
}
