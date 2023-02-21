import { User } from "../../entities/user.entity";
import { characterResponseSerializer } from "../../serializers/character.schemas";
import AppDataSource from "./../../data-source";
import Character from "./../../entities/character.entity";
import {
  ICharacterRequest,
  ICharacterResponse,
} from "./../../interfaces/characters/index";

const createCharacterService = async (
  characterData: ICharacterRequest,
  userId: string
): Promise<ICharacterResponse> => {
  const characterRepo = AppDataSource.getRepository(Character);
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: userId });

  const createdCharacter = characterRepo.create({
    ...characterData,
    user: user,
  });
  await characterRepo.save(createdCharacter);

  const characterResponse = await characterResponseSerializer.validate(
    createdCharacter,
    {
      stripUnknown: true,
    }
  );

  return characterResponse;
};

export default createCharacterService;
