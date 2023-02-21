import { Router } from "express";
import {
  createFriendController,
  deleteFriendController,
  getFriendController,
} from "../controllers/friends.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureNickExistsMiddleware from "../middlewares/friend/ensureUserAndFriendExists.middleware";
import { friendSerializer } from "../serializers/friend.schemas";

const friendsRoute = Router();

friendsRoute.post(
  "",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(friendSerializer),
  ensureNickExistsMiddleware,
  createFriendController
);
friendsRoute.get("", ensureAuthMiddleware, getFriendController);
friendsRoute.delete(
  "",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(friendSerializer),
  ensureNickExistsMiddleware,
  deleteFriendController
);

export default friendsRoute;
