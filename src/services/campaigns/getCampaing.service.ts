import AppDataSource from "../../data-source";
import { Campaign } from "../../entities/campaign.entity";
import { AppError } from "../../errors/AppError";
import { ICampaignResponse } from "../../interfaces/campaign";

const getCampaignService = async (id: string): Promise<ICampaignResponse> => {
  const campaignRepo = AppDataSource.getRepository(Campaign);
  const campaign = await campaignRepo
    .createQueryBuilder("campaigns")
    .innerJoinAndSelect("campaigns.campaignPlayers", "campaignPlayers")
    .innerJoinAndSelect("campaignPlayers.user", "user")
    .where("campaigns.id = :id", { id: id })
    .select("campaigns")
    .addSelect("campaignPlayers")
    .addSelect("user.id")
    .addSelect("user.name")
    .addSelect("user.nick")
    .andWhere("user.isActive = true")
    .getOne();

  return campaign;
};

export default getCampaignService;
