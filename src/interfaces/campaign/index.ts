export interface ICampaignRequest {
  name: string;
  description: string;
  rpgGame: string;
  campaignImg: string;
  plataform: string;
}
export interface ICampaignTest {
  name: string;
  description: string;
  rpgGame: string;
  campaignImg: string;
  plataform: string;
  isActive: boolean;
}

export interface ICampaignResponse {
  id: string;
  name: string;
  description: string;
  rpgGame: string;
  campaignImg: string;
  plataform: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface ICampaignUpdateRequest {
  name?: string;
  description?: string;
  rpgGame?: string;
  campaignImg?: string;
  plataform?: string;
}

// export interface IUser {
//   id: string;
//   name: string;
//   email: string;
//   isAdm: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface IUserLogin {
//   email: string;
//   password: string;
// }

// export interface IUserUpdateRequest {
//   name?: string;
//   email?: string;
//   password?: string;
//   nick?: string;
//   profileImg?: string;
// }

// export interface IUserUpdateResponse {
//   name?: string;
//   email?: string;
//   nick?: string;
//   profileImg?: string;
// }
