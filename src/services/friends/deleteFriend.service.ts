
import AppDataSource from "../../data-source";
import Friend from "../../entities/friends.entity";
import { AppError } from "../../errors/AppError";

const deleteFriendService = async (userId: string, friendNick: string) => {
  const friendsRepo = AppDataSource.getRepository(Friend);

  const friend = await friendsRepo
    .createQueryBuilder("friends")
    .innerJoinAndSelect("friends.user", "user")
    .where("friends.nick = :nick", { nick: friendNick })
    .andWhere("user.id = :id", { id: userId })
    .select("friends")
    .getOne();

  if (!friend) {
    throw new AppError("You are not friends", 409);
  }

  if (!friend.isActive) {
    throw new AppError("You are not friends", 409);
  }

  friend.isActive = false;

  await friendsRepo.save(friend);

  return;
};

export default deleteFriendService;
