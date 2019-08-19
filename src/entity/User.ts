import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BeforeInsert
} from "typeorm";
import {IsEmail, IsEnum, IsNotEmpty, Length} from "class-validator";
import * as bcrypt from "bcryptjs";

export enum UserRole {
  Admin = 'ROLE_ADMIN',
  User = 'ROLE_USER',
}

@Entity()
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

  @Column()
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

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
