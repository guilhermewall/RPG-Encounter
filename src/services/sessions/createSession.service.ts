import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { ISessionRequest } from "../../interfaces/sessions";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import "dotenv/config";
import { compare } from "bcryptjs";

const createSessionService = async ({
  email,
  password,
}: ISessionRequest): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("User or password invalid", 403);
  }

  if (user.isActive === false) {
    throw new AppError("User is not active", 400);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("User or password invalid", 403);
  }

  const token = jwt.sign(
    {
      isActive: user.isActive,
    },
    process.env.SECRET_KEY,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );

  return token;
};

export default createSessionService;
