import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const ensureUserIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User);
  const findUser = await userRepo.findOneBy({ id: req.params.id });

  if (findUser.isActive === false) {
    throw new AppError("User is not active", 404);
  }

  next();
};

export default ensureUserIsActiveMiddleware;
