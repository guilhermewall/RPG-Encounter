import { Request, Response } from "express";
import createFriendService from "../services/friends/createFriend.service";
import deleteFriendService from "../services/friends/deleteFriend.service";
import getFriendService from "../services/friends/getFriend.service";

const createFriendController = async (req: Request, res: Response) => {
  const friendNick: string = req.body.nick;
  const userId: string = req.user.id;
  const newFriend = await createFriendService(friendNick, userId);
  return res.status(201).json(newFriend);
};

const getFriendController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  const friend = await getFriendService(userId);

  return res.status(200).json(friend);
};
const deleteFriendController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  const friendNick: string = req.body.nick;
  await deleteFriendService(userId, friendNick);

  return res.status(204).json({});
};

export { createFriendController, getFriendController, deleteFriendController };
