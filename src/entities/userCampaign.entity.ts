import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Campaign } from "./campaign.entity";
import { User } from "./user.entity";

@Entity("users_campaigns")
class UserCampaign {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.userCampaign)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Campaign, (Campaign) => Campaign.campaignPlayers)
  campaign: Campaign;

  @Column()
  isOwner: boolean;

  @Column({ default: true })
  isActive: boolean;
}

export { UserCampaign };

//yarn typeorm migration:generate -d src/data-source.ts src/migrations/createUsers
//yarn typeorm migration:run -d src/data-source

//ADCIONANDO/ATUALIZANDO
//yarn typeorm migration:generate -d src/data-source.ts src/migrations/includeDefaultTypeFieldUser
//yarn typeorm migration:run -d src/data-source
