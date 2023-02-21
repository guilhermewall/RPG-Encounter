export interface IUserRequest {
  name: string;
  nick: string;
  email: string;
  password: string;
  profileImg?: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  nick: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  profileImg: string;
}

export interface IUser {
  id: string;
  name: string;
  nick: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  profileImg: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
  nick?: string;
  profileImg?: string;
}

export interface IUserUpdateResponse {
  name?: string;
  email?: string;
  nick?: string;
  profileImg?: string;
}
