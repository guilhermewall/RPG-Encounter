import Friend from "../../entities/friends.entity";
import AppDataSource from "./../../data-source";

const getFriendService = async (userId: string) => {
  const friendsRepo = AppDataSource.getRepository(Friend);

  const friends = await friendsRepo
    .createQueryBuilder("friends")
    .where("friends.user = :id", { id: userId })
    .andWhere("friends.isActive = true")
    .getMany();

  return friends;
};

export default getFriendService;
