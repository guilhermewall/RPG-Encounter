import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const ensureUserAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email: req.body.email });
  const userByNick = await userRepository.findOneBy({ nick: req.body.nick });

  if (user) {
    throw new AppError("This email already exists", 409);
  }

  if (userByNick) {
    throw new AppError("This nick already exists", 409);
  }

  next();
};

export default ensureUserAlreadyExistsMiddleware;
