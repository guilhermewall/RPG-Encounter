import { Request, Response } from "express";
import { ICampaignRequest } from "../interfaces/campaign";
import createCampaignService from "../services/campaigns/createCampaign.service";
import deleteCampaignService from "../services/campaigns/deleteCampaign.service";
import getCampaignService from "../services/campaigns/getCampaing.service";
import listCampaignsService from "../services/campaigns/listCampaings.service";
import newPlayerCampaignService from "../services/campaigns/newPlayerCampaign.service";

const createCampaignController = async (req: Request, res: Response) => {
  const campaignData: ICampaignRequest = req.body;
  const userId: string = req.user.id;

  const newCampaign = await createCampaignService(campaignData, userId);
  return res.status(201).json(newCampaign);
};

const listCampaignsController = async (req: Request, res: Response) => {
  const campaigns = await listCampaignsService();

  return res.json(campaigns);
};

const getCampaignController = async (req: Request, res: Response) => {
  const idCampaign = req.params.id;
  const campaign = await getCampaignService(idCampaign);

  return res.json(campaign);
};

const deleteCampaignController = async (req: Request, res: Response) => {
  const idCampaign: string = req.params.id;
  const idUser: string = req.user.id;
  await deleteCampaignService(idCampaign, idUser);
  return res.status(204).json({});
};

const newPlayerCampaignController = async (req: Request, res: Response) => {
  const idCampaign: string = req.params.id;
  const idUserPlayer: string = req.user.id;
  const newPlayer = await newPlayerCampaignService(idCampaign, idUserPlayer);
  return res.status(201).json(newPlayer);
};

export {
  createCampaignController,
  listCampaignsController,
  deleteCampaignController,
  getCampaignController,
  newPlayerCampaignController,
};
