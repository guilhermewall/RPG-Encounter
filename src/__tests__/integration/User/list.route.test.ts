import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import { User } from "../../../entities/user.entity";
import AppDataSource from "../../../data-source";
import { sign } from "jsonwebtoken";
import {
  mockedUsersListRequest,
  mockedUsersListResponse,
} from "../mocks/integration/user.mock";

describe("List user route tests", () => {
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

  it("Should be able to list users", async () => {
    const listUser1 = userRepo.create(mockedUsersListRequest[0]);
    await userRepo.save(listUser1);
    const listUser2 = userRepo.create(mockedUsersListRequest[1]);
    await userRepo.save(listUser2);

    const token = sign({}, process.env.SECRET_KEY, {});

    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send();

    const expectedResponse = {
      status: 200,
      bodyToHaveLength: mockedUsersListResponse.length,
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toHaveLength(expectedResponse.bodyToHaveLength);
    expect(response.body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ password: expect.any(String) }),
      ])
    );
  });

  it("Should not be able to list users with missing token", async () => {
    const response = await request(app).get(baseUrl).send();

    const expectedResponse = {
      status: 401,
      bodyToEqual: { message: "Invalid token" },
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toStrictEqual(expectedResponse.bodyToEqual);
  });

  it("Should be able to list an user", async () => {
    const listUser1 = userRepo.create(mockedUsersListRequest[0]);
    await userRepo.save(listUser1);
    const user = await userRepo.findOneBy({ nick: "nickTest1" });

    const token = sign({}, process.env.SECRET_KEY, {});

    const response = await request(app)
      .get(`${baseUrl}/${user.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    const expectedResponse = {
      status: 200,
      bodyToHave: mockedUsersListResponse[0],
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toEqual(expectedResponse.bodyToHave);

    const [userList, amount] = await userRepo.findAndCountBy({
      nick: "nickTest1",
    });
    expect(amount).toBe(1);
  });

  it("Should not be able to list an user with missing token", async () => {
    const listUser1 = userRepo.create(mockedUsersListRequest[0]);
    await userRepo.save(listUser1);
    const user = await userRepo.findOneBy({ nick: "nickTest1" });

    const response = await request(app).get(`${baseUrl}/${user.id}`).send();

    const expectedResponse = {
      status: 401,
      bodyToEqual: { message: "Invalid token" },
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toStrictEqual(expectedResponse.bodyToEqual);
  });
});
