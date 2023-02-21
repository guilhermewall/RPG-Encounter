import { hashSync } from "bcryptjs";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IFriendRequest } from "../interfaces/friends/friends.interfaces";
import {
  IUserRequest,
  IUserResponse,
  IUserUpdateRequest,
  IUserUpdateResponse,
} from "../interfaces/users";

const friendSerializer: SchemaOf<IFriendRequest> = yup.object().shape({
  nick: yup.string().required(),
});

export { friendSerializer };
