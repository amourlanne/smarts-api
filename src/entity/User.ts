import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BeforeInsert
} from "typeorm";
import {IsEmail, IsNotEmpty, Length} from "class-validator";
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
  id: number;

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
  role: UserRole;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

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

  validateUnencryptedPasswordOfFail(unencryptedPassword: string) {
    if(!bcrypt.compareSync(unencryptedPassword, this.password)) {
      throw new Error();
    }
  }


}
