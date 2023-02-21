import { Request, Response } from "express";
import { ICharacterRequest } from "../interfaces/characters";
import createCharacterService from "../services/characters/createCharacter.service";
import getCharacterService from "../services/characters/getCharacter.service";
import deleteCharacterService from "./../services/characters/deleteCharacter.service";

const createCharacterController = async (req: Request, res: Response) => {
  const characterData: ICharacterRequest = req.body;
  const userId: string = req.user.id;
  const newCharacter = await createCharacterService(characterData, userId);
  return res.status(201).json(newCharacter);
};

const getCharacterController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  const charactersId: string = req.params.id;
  const character = await getCharacterService(userId, charactersId);

  return res.status(200).json(character);
};

const deleteCharacterController = async (req: Request, res: Response) => {
  const characterId: string = req.params.id;
  const userId: string = req.user.id;
  await deleteCharacterService(characterId, userId);
  return res.status(204).json({});
};

export {
  createCharacterController,
  getCharacterController,
  deleteCharacterController,
};
