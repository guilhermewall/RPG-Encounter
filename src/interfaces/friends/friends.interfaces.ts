import { IUser } from "./../users/index";

export interface IFriendRequest {
  nick: string;
}

export interface IFriendResponse {
  id: string;
  nick: string;
  user: IUser;
}
