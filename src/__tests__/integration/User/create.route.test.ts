import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import { User } from "../../../entities/user.entity";
import AppDataSource from "../../../data-source";
import {
  mockedUserInvalidBodyRequest,
  mockedUserRequest,
} from "../mocks/integration/user.mock";

describe("Create user route tests", () => {
  let conn: DataSource;
  const baseUrl: string = "/users";
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => console.error(err));
  });

  beforeEach(async () => {
    const users = await userRepo.find();
    await userRepo.remove(users);
  });

  afterAll(async () => {
    await conn.destroy;
  });

  it("Should be able to create user", async () => {
    const response = await request(app).post(baseUrl).send(mockedUserRequest);

    const expectedResults = {
      status: 201,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        nick: expect.any(String),
        email: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        isActive: expect.any(Boolean),
        profileImg: expect.any(String),
      })
    );
    expect(response.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );

    const [user, amount] = await userRepo.findAndCount();
    expect(amount).toBe(1);
  });

  it("Should not be able to create a user with invalid request body", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedUserInvalidBodyRequest);

    const expectedResults = {
      status: 400,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.arrayContaining([
          "password is a required field",
          "email is a required field",
        ]),
      })
    );

    const [user, amount] = await userRepo.findAndCount();
    expect(amount).toBe(0);
  });

  it("Should not be able to create a user that already exists", async () => {
    const userTest = userRepo.create(mockedUserRequest);
    await userRepo.save(userTest);

    const response = await request(app).post(baseUrl).send(mockedUserRequest);

    const expectedResults = {
      status: 409,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining({ message: "This email already exists" })
    );

    const [user, amount] = await userRepo.findAndCount();
    expect(amount).toBe(1);
  });
});
