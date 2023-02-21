import Friend from "../../entities/friends.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import AppDataSource from "./../../data-source";

const createFriendService = async (
  friendNick: string,
  idUser: string
): Promise<{}> => {
  const friendRepo = AppDataSource.getRepository(Friend);
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: idUser });

  const friend = await friendRepo
    .createQueryBuilder("friends")
    .innerJoinAndSelect("friends.user", "user")
    .where("friends.nick = :nick", { nick: friendNick })
    .andWhere("user.id = :id", { id: idUser })
    .select("friends")
    .getOne();

  if (friend) {
    if (friend.isActive) {
      throw new AppError("You are already friends", 409);
    } else {
      friend.isActive = true;
      await friendRepo.save(friend);
      return { message: "friend add" };
    }
  }

  const newFriend = friendRepo.create({
    nick: friendNick,
    user: user,
  });
  await friendRepo.save(newFriend);
  return { message: "friend add" };
};

export default createFriendService;
