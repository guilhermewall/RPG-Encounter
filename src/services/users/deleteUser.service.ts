import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const deleteUserService = async (idUserDelete: string, idUser: string) => {
  const userRepository = AppDataSource.getRepository(User);

  if (idUserDelete !== idUser) {
    throw new AppError("You dont have permission", 403);
  }

  const user = await userRepository.findOneBy({ id: idUserDelete });

  user.isActive = false;
  await userRepository.save(user);
};

export default deleteUserService;
