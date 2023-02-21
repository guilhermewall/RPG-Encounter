import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Character from "../../entities/character.entity";
import { AppError } from "../../errors/AppError";

const ensureCharacterAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let validate = require("uuid-validate");

  if (!validate(req.params.id)) {
    throw new AppError("Character not exist", 404);
  }

  const characterRepo = AppDataSource.getRepository(Character);
  const character = await characterRepo.findOneBy({ id: req.params.id });

  if (!character) {
    throw new AppError("Character not exist", 404);
  }

  if (!character.isActive) {
    throw new AppError("Character is not active", 404);
  }

  return next();
};

export default ensureCharacterAlreadyExistsMiddleware;
