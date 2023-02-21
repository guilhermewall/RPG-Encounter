import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { UserCampaign } from "./userCampaign.entity";

@Entity("campaigns")
class Campaign {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 3000 })
  description: string;

  @Column({ length: 50 })
  rpgGame: string;

  @Column({
    type: "varchar",
    default:
      "https://kanto.legiaodosherois.com.br/w760-h398-cfill/wp-content/uploads/2020/08/legiao_9b0AChMUGzL4.jpg.webp",
  })
  campaignImg: string;

  @Column({ length: 50 })
  plataform: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => UserCampaign, (player) => player.campaign)
  @JoinColumn()
  campaignPlayers: UserCampaign[];
}

export { Campaign };

//yarn typeorm migration:generate -d src/data-source.ts src/migrations/createUsers
//yarn typeorm migration:run -d src/data-source

//ADCIONANDO/ATUALIZANDO
//yarn typeorm migration:generate -d src/data-source.ts src/migrations/includeDefaultTypeFieldUser
//yarn typeorm migration:run -d src/data-source
