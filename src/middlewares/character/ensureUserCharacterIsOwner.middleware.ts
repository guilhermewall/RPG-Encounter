import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Character from "../../entities/character.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const ensureUserCharacterIsOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const characterRepo = AppDataSource.getRepository(Character);

  const character = await characterRepo.findOneBy({ id: req.params.id });
  const findCharacter = await characterRepo.findOne({
    where: {
      id: req.params.id,
    },
    relations: {
      user: true,
    },
  });
  const userId: string = req.user.id;

 

  if (findCharacter.user.id !== userId) {
    throw new AppError("You dont have permission", 401);
  }

  return next();
};

export default ensureUserCharacterIsOwnerMiddleware;
