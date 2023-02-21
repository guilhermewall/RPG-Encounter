import AppDataSource from "../../data-source";
import { Campaign } from "../../entities/campaign.entity";
import { User } from "../../entities/user.entity";
import { UserCampaign } from "../../entities/userCampaign.entity";
import { ICampaignRequest } from "../../interfaces/campaign";

const createCampaignService = async (
  campaignData: ICampaignRequest,
  userId: string
): Promise<Campaign> => {
  const campaignRepo = AppDataSource.getRepository(Campaign);
  const userRepo = AppDataSource.getRepository(User);
  const userCampaignRepo = AppDataSource.getRepository(UserCampaign);

  const campaign = campaignRepo.create(campaignData);
  const newCampaign = await campaignRepo.save(campaign);

  const user = await userRepo.findOneBy({ id: userId });
  const userCampaign = userCampaignRepo.create({
    user: user,
    campaign: newCampaign,
    isOwner: true,
  });

  await userCampaignRepo.save(userCampaign);

  return newCampaign;
};

export default createCampaignService;
