import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";

import ensureUserAlreadyExistsMiddleware from "../middlewares/users/ensureUserAlreadyExists.middleware";
import ensureUserExistsMiddleware from "../middlewares/users/ensureUserExists.middleware";
import ensureUserIsActiveMiddleware from "../middlewares/users/ensureUserIsActive.middleware";
import {
  userSerializer,
  userUpdateSerializer,
} from "../serializers/user.schemas";

const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSerializer),
  ensureUserAlreadyExistsMiddleware,
  createUserController
);
userRoutes.get("", ensureAuthMiddleware, listUsersController);
userRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  ensureUserIsActiveMiddleware,
  getUserController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  ensureUserIsActiveMiddleware,
  ensureDataIsValidMiddleware(userUpdateSerializer),
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  ensureUserIsActiveMiddleware,
  deleteUserController
);

export default userRoutes;
