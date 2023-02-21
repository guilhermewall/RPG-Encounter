import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import Character from "../../entities/character.entity";
import { User } from "../../entities/user.entity";

const ensureUserHasCharacterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const characterRepo = AppDataSource.getRepository(Character);
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({
    relations: {
      character: true,
    },
    where: {
      id: req.user.id,
    },
  });

  const findCharacter = user.character.find((character) => character.isActive);

  if (findCharacter) {
    throw new AppError("You already have an active character", 409);
  }

  return next();
};

export default ensureUserHasCharacterMiddleware;
