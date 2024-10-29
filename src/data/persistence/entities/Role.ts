import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: "name", type: "varchar", nullable: false })
  name!: string;

  @OneToMany(() => User, (user) => user.role)
  users?: User[];
}
