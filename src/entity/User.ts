import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BeforeInsert, ManyToOne, OneToMany, ManyToMany, JoinTable,
} from 'typeorm';
import {IsEmail, IsEnum, IsNotEmpty, Length} from "class-validator";
import * as bcrypt from "bcryptjs";
import { Company } from './Company';
import {UserProject} from "./UserProject";
import { UserOrganization } from './UserOrganization';
import { Project } from './Project';
import { Organization } from './Organization';
import { Group } from 'nodemailer/lib/addressparser';

export enum UserRole {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
}

@Entity("users")
@Unique(["username"])
@Unique(["email"])
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Length(4, 100)
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER
  })
  @IsNotEmpty()
  @IsEnum(UserRole) // Not working
  role: UserRole;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column({default: false})
  activated: boolean;

  @ManyToOne(() => Company, company => company.users)
  company: Company;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserProject, (userProject) => userProject.user)
  userProjects: UserProject[];

  @OneToMany(() => UserOrganization, (userOrganization) => userOrganization.user)
  userOrganizations: UserOrganization[];

  @OneToMany(() => Organization, organization => organization.owner)
  organizations: Organization[];

  @OneToMany(() => Project, project => project.owner)
  projects: Project[];

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  isAdmin() {
    return this.role === UserRole.ADMIN
  }
}
