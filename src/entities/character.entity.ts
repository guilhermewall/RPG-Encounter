import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity("characters")
class Character {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  race: string;

  @Column({ length: 50 })
  class: string;

  @Column({ length: 120 })
  background: string;

  @Column({ default: 1 })
  level: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.character)
  user: User;
}
export default Character;
