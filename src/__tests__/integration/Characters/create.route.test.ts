import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Character from "../../../entities/character.entity";
import { User } from "../../../entities/user.entity";
import { mockedCharacterRequest } from "../mocks/integration/character.mock";
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

  it("Should be able to create character", async () => {
    const listUser1 = userRepo.create(mockedUsersListRequest[0]);
    await userRepo.save(listUser1);
    const user = await userRepo.findOneBy({ nick: "nickTest1" });

    const userloggedIn = await request(app)
      .post("/login")
      .send({ email: user.email, password: "1234" });

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userloggedIn.body.token}`)
      .send(mockedCharacterRequest);

    const expectedResults = {
      status: 201,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        race: expect.any(String),
        class: expect.any(String),
        background: expect.any(String),
        createdAt: expect.any(String),
        level: expect.any(Number),
        isActive: expect.any(Boolean),
      })
    );

    const [character, amount] = await characterRepo.findAndCount();
    expect(amount).toBe(1);
  });

  it("Should not be able to create an character with missing token", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedCharacterRequest);

    const expectedResponse = {
      status: 401,
      bodyToEqual: { message: "Invalid token" },
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toStrictEqual(expectedResponse.bodyToEqual);
  });

  it("Should not be able to create an character if user already have one", async () => {
    const listUser1 = userRepo.create(mockedUsersListRequest[1]);
    await userRepo.save(listUser1);
    const user = await userRepo.findOne({
      where: { nick: "nickTest2" },
      relations: { character: true },
    });

    const characterUser1 = characterRepo.create({
      ...mockedCharacterRequest,
      user: user,
    });
    await characterRepo.save(characterUser1);

    const userloggedIn = await request(app)
      .post("/login")
      .send({ email: user.email, password: "1234" });

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userloggedIn.body.token}`)
      .send({ ...mockedCharacterRequest, user: user });

    const expectedResults = {
      status: 409,
      bodyToEqual: { message: "You already have an active character" },
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(expectedResults.bodyToEqual);
  });
});
