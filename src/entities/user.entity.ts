import { hashSync } from "bcryptjs";
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  BeforeUpdate,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { UserCampaign } from "./userCampaign.entity";
import Friend from "./friends.entity";
import Character from "./character.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  nick: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default:
      "https://play-lh.googleusercontent.com/0RxUnSidXheeQk4fcFCtjysbE_OX_1IwmKXoSA1w3RZQG0so1JNowmyA4mfH9S1Wih0",
  })
  profileImg: string;

  @OneToMany(() => UserCampaign, (userCampaign) => userCampaign.user)
  userCampaign: UserCampaign[];

  @OneToMany(() => Friend, (friend) => friend.user)
  friends: Friend[];

  @OneToMany(() => Character, (character) => character.user)
  character: Character[];

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}

export { User };

//yarn typeorm migration:generate -d src/data-source.ts src/migrations/createUsers
//yarn typeorm migration:run -d src/data-source

//ADCIONANDO/ATUALIZANDO
//yarn typeorm migration:generate -d src/data-source.ts src/migrations/includeDefaultTypeFieldUser
//yarn typeorm migration:run -d src/data-source
