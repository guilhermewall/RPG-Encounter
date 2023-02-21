import AppDataSource from "../../data-source";
import { Campaign } from "../../entities/campaign.entity";
import { User } from "../../entities/user.entity";
import { UserCampaign } from "../../entities/userCampaign.entity";
import { AppError } from "../../errors/AppError";

const newPlayerCampaignService = async (
  idCampaign: string,
  idUserPlayer: string
): Promise<{}> => {
  const campaignRepo = AppDataSource.getRepository(Campaign);
  const userRepo = AppDataSource.getRepository(User);
  const userCampaignRepo = AppDataSource.getRepository(UserCampaign);

  const user = await userRepo.findOneBy({ id: idUserPlayer });
  const campaign = await campaignRepo
    .createQueryBuilder("campaigns")
    .innerJoinAndSelect("campaigns.campaignPlayers", "campaignPlayers")
    .innerJoinAndSelect("campaignPlayers.user", "user")
    .where("campaigns.id = :id", { id: idCampaign })
    .select("campaigns")
    .addSelect("campaignPlayers")
    .addSelect("user.id")
    .addSelect("user.name")
    .addSelect("user.nick")
    .andWhere("user.isActive = true")
    .getOne();

  const playerExist = campaign.campaignPlayers.find(
    (player) => player.user.id === idUserPlayer
  );

  if (playerExist) {
    throw new AppError("Player already in the campaign", 409);
  }

  const userCampaign = userCampaignRepo.create({
    user: user,
    campaign: campaign,
    isOwner: false,
  });

  await userCampaignRepo.save(userCampaign);

  return { message: "Player add" };
};

export default newPlayerCampaignService;
