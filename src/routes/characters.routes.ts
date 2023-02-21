import { Router } from "express";
import {
  createCharacterController,
  deleteCharacterController,
  getCharacterController,
} from "../controllers/characters.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { characterSerializer } from "../serializers/character.schemas";
import ensureUserHasCharacterMiddleware from "../middlewares/character/ensureUserHasCharacter.middleware";
import ensureCharacterAlreadyExistsMiddleware from "./../middlewares/character/ensureCharacterAlreadyExists.middleware";
import ensureUserCharacterIsOwnerMiddleware from "./../middlewares/character/ensureUserCharacterIsOwner.middleware";

const charactersRoute = Router();

charactersRoute.post(
  "",
  ensureAuthMiddleware,
  ensureUserHasCharacterMiddleware,
  ensureDataIsValidMiddleware(characterSerializer),
  createCharacterController
);
charactersRoute.get(
  "/:id",
  ensureAuthMiddleware,
  ensureCharacterAlreadyExistsMiddleware,
  ensureUserCharacterIsOwnerMiddleware,
  getCharacterController
);
charactersRoute.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureCharacterAlreadyExistsMiddleware,
  ensureUserCharacterIsOwnerMiddleware,
  deleteCharacterController
);

export default charactersRoute;
