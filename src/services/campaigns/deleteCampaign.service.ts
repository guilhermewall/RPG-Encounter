import AppDataSource from "../../data-source";
import { Campaign } from "../../entities/campaign.entity";
import { AppError } from "../../errors/AppError";

const deleteCampaignService = async (idCampaign: string, idUser: string) => {
  const campaignRepo = AppDataSource.getRepository(Campaign);
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

  const masterCampaign = campaign.campaignPlayers.find(
    (player) => player.isOwner
  );

  if (masterCampaign.user.id !== idUser) {
    throw new AppError("You dont have permission", 403);
  }

  campaign.isActive = false;

  await campaignRepo.save(campaign);
};

export default deleteCampaignService;
