import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const ensureNickExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User);
  const friend = await userRepo.findOneBy({ nick: req.body.nick });

  if (!friend) {
    throw new AppError("Nick not found", 404);
  }

  if (!friend.isActive) {
    throw new AppError("User is not active", 404);
  }
  next();
};

export default ensureNickExistsMiddleware;
