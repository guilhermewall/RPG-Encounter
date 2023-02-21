import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import { User } from "../../../entities/user.entity";
import AppDataSource from "../../../data-source";
import {
  mockedUserNotActiveRequest,
  mockedUsersListRequest,
} from "../mocks/integration/user.mock";

describe("Delete user route tests", () => {
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

  it("Should be able to delete an user", async () => {
    const listUser1 = userRepo.create(mockedUsersListRequest[0]);
    await userRepo.save(listUser1);
    const user = await userRepo.findOneBy({ nick: "nickTest1" });

    const userloggedIn = await request(app)
      .post("/login")
      .send({ email: user.email, password: "1234" });

    const response = await request(app)
      .delete(`${baseUrl}/${user.id}`)
      .set("Authorization", `Bearer ${userloggedIn.body.token}`)
      .send();

    const expectedResults = {
      status: 204,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(expect.objectContaining({}));
    expect(response.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );
    expect(response.body).not.toEqual(
      expect.objectContaining({ id: expect.any(String) })
    );
  });

  it("Should not be able to delete an user with missing token", async () => {
    const listUser1 = userRepo.create(mockedUsersListRequest[0]);
    await userRepo.save(listUser1);
    const user = await userRepo.findOneBy({ nick: "nickTest1" });

    const response = await request(app).delete(`${baseUrl}/${user.id}`).send();

    const expectedResponse = {
      status: 401,
      bodyToEqual: { message: "Invalid token" },
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toStrictEqual(expectedResponse.bodyToEqual);
  });

  it("Should not be able to delete an user that doesn't exists", async () => {
    const listUser1 = userRepo.create(mockedUsersListRequest[0]);
    await userRepo.save(listUser1);
    const user = await userRepo.findOneBy({ nick: "nickTest1" });

    const userloggedIn = await request(app)
      .post("/login")
      .send({ email: user.email, password: "1234" });

    const response = await request(app)
      .delete(`${baseUrl}/notValidId`)
      .set("Authorization", `Bearer ${userloggedIn.body.token}`)
      .send();

    const expectedResponse = {
      status: 404,
      bodyToEqual: { message: "User not exist" },
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toStrictEqual(expectedResponse.bodyToEqual);
  });

  it("Should not be able to delete an user not active", async () => {
    const userNotActive = userRepo.create(mockedUserNotActiveRequest);
    await userRepo.save(userNotActive);
    const findUserNotActive = await userRepo.findOneBy({ nick: "nickTest" });

    const userloggedInNotActive = await request(app)
      .post("/login")
      .send({ email: findUserNotActive.email, password: "1234" });

    await request(app)
      .delete(`${baseUrl}/${findUserNotActive.id}`)
      .set("Authorization", `Bearer ${userloggedInNotActive.body.token}`)
      .send();

    const userActive = userRepo.create(mockedUsersListRequest[0]);
    await userRepo.save(userActive);
    const findUserActive = await userRepo.findOneBy({ nick: "nickTest1" });

    const userloggedInActive = await request(app)
      .post("/login")
      .send({ email: findUserActive.email, password: "1234" });

    const response = await request(app)
      .delete(`${baseUrl}/${findUserNotActive.id}`)
      .set("Authorization", `Bearer ${userloggedInActive.body.token}`)
      .send();

    const expectedResponse = {
      status: 404,
      bodyToEqual: { message: "User is not active" },
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toStrictEqual(expectedResponse.bodyToEqual);
  });
});
