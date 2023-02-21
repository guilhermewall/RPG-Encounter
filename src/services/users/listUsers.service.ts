import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users";

const listUsersService = async (): Promise<IUserResponse[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find({
    relations: {
      friends: true,
    },
    where: {
      isActive: true,
    },
  });

  const usersNotPassword = users.map((user) => {
    const { password, ...notPassWord } = user;
    return notPassWord;
  });

  return usersNotPassword;
};

export default listUsersService;
