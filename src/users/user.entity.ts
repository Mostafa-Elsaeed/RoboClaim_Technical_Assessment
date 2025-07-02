import { BaseEntity } from "../database/base-entity";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  hashPassword: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  profileImageUrl?: string;
}
