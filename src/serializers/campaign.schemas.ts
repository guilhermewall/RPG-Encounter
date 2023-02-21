import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  ICampaignRequest,
  ICampaignUpdateRequest,
} from "../interfaces/campaign";

const campaignSerializer: SchemaOf<ICampaignRequest> = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  rpgGame: yup.string().required(),
  campaignImg: yup.string().notRequired().url(),
  plataform: yup.string().required(),
});

const campaignUpdateSerializer: SchemaOf<ICampaignUpdateRequest> = yup
  .object()
  .shape({
    name: yup.string().notRequired(),
    description: yup.string().notRequired(),
    rpgGame: yup.string().notRequired(),
    campaignImg: yup.string().notRequired().url(),
    plataform: yup.string().notRequired(),
  });

export { campaignSerializer, campaignUpdateSerializer };
