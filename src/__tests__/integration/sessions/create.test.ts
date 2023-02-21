import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { User } from "../../../entities/user.entity";
import { mockedUsersListRequest } from "../mocks/integration/user.mock";

describe("create login route test", () => {
  let connection: DataSource;
  const baseUrl: string = "/login";
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => console.error(err));
  });

  beforeEach(async () => {
    const campaign = await userRepo.find();
    await userRepo.remove(campaign);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("login must be carried out successfully", async () => {
    const listUserOne = userRepo.create(mockedUsersListRequest[1]);
    await userRepo.save(listUserOne);
    const user = await userRepo.findOneBy({ nick: "nickTest2" });

    const response = await request(app)
      .post(baseUrl)
      .send({ email: user.email, password: "1234" });

    const expectedResult = {
      status: 200,
      token: { token: expect.any(String) },
    };
    expect(response.status).toBe(expectedResult.status);
    expect(response.body).toEqual(expectedResult.token);
  });

  it("should should allow login with wrong password", async () => {
    const listUserOne = userRepo.create(mockedUsersListRequest[1]);
    await userRepo.save(listUserOne);
    const user = await userRepo.findOneBy({ nick: "nickTest2" });

    const response = await request(app)
      .post(baseUrl)
      .send({ email: user.email, password: "12345" });

    const expectedResult = {
      status: 403,
      message: { message: "User or password invalid" },
    };
    expect(response.status).toBe(expectedResult.status);
    expect(response.body).toEqual(expectedResult.message);
  });

  it("should not allow login with wrong email", async () => {
    const listUserOne = userRepo.create(mockedUsersListRequest[1]);
    await userRepo.save(listUserOne);
    const user = await userRepo.findOneBy({ nick: "nickTest2" });

    const response = await request(app)
      .post(baseUrl)
      .send({ email: "guilherme@maill.com", password: "12345" });

    const expectedResult = {
      status: 403,
      message: { message: "User or password invalid" },
    };
    expect(response.status).toBe(expectedResult.status);
    expect(response.body).toEqual(expectedResult.message);
  });
});
