import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import validate from "uuid-validate";
import { AppError } from "../../errors/AppError";

const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!validate(req.params.id)) {
    throw new AppError("User not exist", 404);
  }

  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: req.params.id,
  });

  if (!findUser) {
    throw new AppError("User not exist", 404);
  }

  next();
};

export default ensureUserExistsMiddleware;
