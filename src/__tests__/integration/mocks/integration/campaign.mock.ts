import {
  ICampaignRequest,
  ICampaignTest,
} from "./../../../../interfaces/campaign/index";

const mockedCampaignRequest: ICampaignRequest = {
  campaignImg:
    "https://3.bp.blogspot.com/-Rf-lefsKbB4/Uf7g3Zl33QI/AAAAAAAACiM/xRfhxnHR1X4/s1600/1met5.jpg",
  description: "descrição da campanha de guilherme",
  name: "guerreiros da campanha do guilherme",
  rpgGame: "game da campanha do guilherme",
  plataform: "plataforma da campanha do guilherme",
};

const mockedCampaign: ICampaignRequest = {
  campaignImg:
    "https://3.bp.blogspot.com/-Rf-lefsKbB4/Uf7g3Zl33QI/AAAAAAAACiM/xRfhxnHR1X4/s1600/1met5.jpg",
  description: "descrição 2 da campanha de guilherme",
  name: "guerreiros 2 da campanha do guilherme",
  rpgGame: "game 2 da campanha do guilherme",
  plataform: "plataforma 2 da campanha do guilherme",
};
const mockedCampaignIsActiveFalse: ICampaignTest = {
  campaignImg:
    "https://3.bp.blogspot.com/-Rf-lefsKbB4/Uf7g3Zl33QI/AAAAAAAACiM/xRfhxnHR1X4/s1600/1met5.jpg",
  description: "descrição 2 da campanha de guilherme",
  name: "guerreiros 2 da campanha do guilherme",
  rpgGame: "game 2 da campanha do guilherme",
  plataform: "plataforma 2 da campanha do guilherme",
  isActive: false,
};

export { mockedCampaignRequest, mockedCampaign, mockedCampaignIsActiveFalse };
