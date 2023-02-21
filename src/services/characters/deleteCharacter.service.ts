import AppDataSource from "../../data-source";
import Character from "./../../entities/character.entity";

const deleteCharacterService = async (characterId: string, userId: string) => {
  const characterRepository = AppDataSource.getRepository(Character);
  const character = await characterRepository.findOneBy({ id: characterId });

  character.isActive = false;
  await characterRepository.save(character);
};

export default deleteCharacterService;
