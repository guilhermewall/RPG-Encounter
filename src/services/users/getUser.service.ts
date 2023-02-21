import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users";

const getUserService = async (idUser: string): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: idUser,
    },
  });

  const { password, ...userNotPassWord } = user;

  return userNotPassWord;
};

export default getUserService;
