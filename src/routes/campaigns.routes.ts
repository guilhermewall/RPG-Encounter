import { Router } from "express";
import {
  createCampaignController,
  deleteCampaignController,
  getCampaignController,
  listCampaignsController,
  newPlayerCampaignController,
} from "../controllers/campaign.controllers";
import ensureIsValidateCampaignMiddleware from "../middlewares/campaigns/ensureIsValidateCampaign.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { campaignSerializer } from "../serializers/campaign.schemas";

const campaignRoutes = Router();

campaignRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(campaignSerializer),
  createCampaignController
);
campaignRoutes.get("", ensureAuthMiddleware, listCampaignsController);

campaignRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureIsValidateCampaignMiddleware,
  getCampaignController
);

campaignRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsValidateCampaignMiddleware,
  deleteCampaignController
);

campaignRoutes.post(
  "/:id",
  ensureAuthMiddleware,
  ensureIsValidateCampaignMiddleware,
  newPlayerCampaignController
);

export default campaignRoutes;
