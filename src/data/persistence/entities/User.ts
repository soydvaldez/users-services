import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "./Role";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "firstname", type: "varchar", nullable: false })
  firstName!: string;

  @Column({ name: "lastname", type: "varchar" })
  lastName!: string;

  @Column({ name: "email", type: "varchar" })
  email!: string;

  @Column({ name: "password", type: "varchar" })
  password!: string;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive!: boolean;

  @Column({ name: "role_id", type: "number" })
  roleId!: number; // Agrega esta columna para el id directamente

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt!: Date;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: "role_id" })
  role!: Role;

  getFullname() {
    return this.firstName + this.lastName;
  }
}

// SELECT "User"."id" AS "User_id",
// "User"."firstname" AS "User_firstname",
// "User"."lastname" AS "User_lastname", "User"."email" AS "User_email",
//  "User"."password" AS "User_password",
//  "User"."is_active" AS "User_is_active",
//  "User"."roleid" AS "User_roleid",
//  "User__role"."id" AS "User__role_id",
//  "User__role"."name" AS "User__role_name"
// FROM "users" "User"
// LEFT JOIN "roles" "User__role" ON "User__role"."id"="User"."roleid"

// ALTER TABLE "users" DROP CONSTRAINT "users_pkey"

// select r.name, u.id, u.firstname
// from users u
// inner join roles r on u.roleid = r.id;
