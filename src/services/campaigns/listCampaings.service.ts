import AppDataSource from "../../data-source";
import { Campaign } from "../../entities/campaign.entity";
import { AppError } from "../../errors/AppError";
import { ICampaignResponse } from "../../interfaces/campaign";

const listCampaignsService = async (): Promise<{}> => {
  const campaignRepo = AppDataSource.getRepository(Campaign);

  const listCampaign = await campaignRepo
    .createQueryBuilder("campaigns")
    .innerJoinAndSelect("campaigns.campaignPlayers", "campaignPlayers")
    .innerJoinAndSelect("campaignPlayers.user", "user")
    .where("campaigns.isActive = true")
    .select("campaigns")
    .addSelect("campaignPlayers")
    .addSelect("user.id")
    .addSelect("user.name")
    .addSelect("user.nick")
    .andWhere("user.isActive = true")
    .getMany();

  return listCampaign;
};

export default listCampaignsService;
