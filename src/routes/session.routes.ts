import { Router } from "express";
import { createSessionController } from "../controllers/session.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { createSessionSchema } from "../serializers/session.schemas";

const sessionRoutes = Router();

sessionRoutes.post(
  "",
  ensureDataIsValidMiddleware(createSessionSchema),
  createSessionController
);

export default sessionRoutes;
