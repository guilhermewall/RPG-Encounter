import {
  ICharacterRequest,
  ICharacterResponse,
} from "../../../../interfaces/characters";

const mockedCharacterRequest: ICharacterRequest = {
  name: "characterTestName",
  race: "characterTestRace",
  class: "characterTestClass",
  background: "characterTestBg",
};
const mockedCharacterResponse: ICharacterResponse = {
  id: expect.any(String),
  name: expect.any(String),
  race: expect.any(String),
  class: expect.any(String),
  background: expect.any(String),
  level: expect.any(Number),
  createdAt: expect.any(String),
  isActive: expect.any(Boolean),
};

export { mockedCharacterRequest, mockedCharacterResponse };
