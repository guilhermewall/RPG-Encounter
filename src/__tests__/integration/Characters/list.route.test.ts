import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Character from "../../../entities/character.entity";
import { User } from "../../../entities/user.entity";
import {
  mockedCharacterRequest,
  mockedCharacterResponse,
} from "../mocks/integration/character.mock";
import { mockedUsersListRequest } from "../mocks/integration/user.mock";

describe("Create characters route tests", () => {
  let conn: DataSource;
  const baseUrl: string = "/characters";
  const characterRepo: Repository<Character> =
    AppDataSource.getRepository(Character);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => console.error(err));
  });

  beforeEach(async () => {
    const characters = await characterRepo.find();
    await characterRepo.remove(characters);
  });

  afterAll(async () => {
    await conn.destroy;
  });

  it("Should be able to list a character", async () => {
    const listUser1 = userRepo.create(mockedUsersListRequest[1]);
    await userRepo.save(listUser1);
    const user = await userRepo.findOneBy({ nick: "nickTest2" });

    const userloggedIn = await request(app)
      .post("/login")
      .send({ email: user.email, password: "1234" });

    const character = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userloggedIn.body.token}`)
      .send(mockedCharacterRequest);

    const response = await request(app)
      .get(`${baseUrl}/${character.body.id}`)
      .set("Authorization", `Bearer ${userloggedIn.body.token}`)
      .send();

    const expectedResponse = {
      status: 200,
      bodyToHave: mockedCharacterResponse,
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toEqual(expectedResponse.bodyToHave);
  });

  it("Should not be able to list character with missing token", async () => {
    const listUser1 = userRepo.create(mockedUsersListRequest[0]);
    await userRepo.save(listUser1);
    const user = await userRepo.findOneBy({ nick: "nickTest1" });

    const userloggedIn = await request(app)
      .post("/login")
      .send({ email: user.email, password: "1234" });

    const character = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userloggedIn.body.token}`)
      .send(mockedCharacterRequest);

    const response = await request(app)
      .get(`${baseUrl}/${character.body.id}`)
      .send(mockedCharacterRequest);

    const expectedResponse = {
      status: 401,
      bodyToEqual: { message: "Invalid token" },
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toStrictEqual(expectedResponse.bodyToEqual);
  });
});
