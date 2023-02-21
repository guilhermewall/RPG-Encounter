import AppDataSource from "../../data-source";
import Character from "./../../entities/character.entity";

const getCharacterService = async (
  userId: string,
  characterId: string
): Promise<{}> => {
  const characterRepo = AppDataSource.getRepository(Character);

  const character = await characterRepo.findOneBy({ id: characterId });

  return character;
};

export default getCharacterService;
