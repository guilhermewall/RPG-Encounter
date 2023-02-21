import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Friend from "../../../entities/friends.entity";
import { User } from "../../../entities/user.entity";
import { mockedUsersListRequest } from "../mocks/integration/user.mock";

describe("List friends route tests", () => {
  let conn: DataSource;
  const baseUrl: string = "/friends";
  const friendsRepo: Repository<Friend> = AppDataSource.getRepository(Friend);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => console.error(err));
  });

  beforeEach(async () => {
    const friends = await friendsRepo.find();
    await friendsRepo.remove(friends);
    const users = await userRepo.find();
    await userRepo.remove(users);
  });

  afterAll(async () => {
    await conn.destroy;
  });

  it("Should be able to list friends", async () => {
    const listUser1 = userRepo.create(mockedUsersListRequest[0]);
    await userRepo.save(listUser1);
    const user1 = await userRepo.findOneBy({ nick: "nickTest1" });

    const listUser2 = userRepo.create(mockedUsersListRequest[1]);
    await userRepo.save(listUser2);
    const user2 = await userRepo.findOneBy({ nick: "nickTest2" });

    const userloggedIn = await request(app)
      .post("/login")
      .send({ email: user1.email, password: "1234" });

    const addFriend = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userloggedIn.body.token}`)
      .send({ nick: user2.nick });

    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${userloggedIn.body.token}`)
      .send();

    const expectedResults = {
      status: 200,
      bodyToEqual: [
        {
          id: expect.any(String),
          nick: "nickTest2",
          isActive: true,
        },
      ],
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(expectedResults.bodyToEqual);
  });

  it("Should not be able to list friends with missing token", async () => {
    const listUser1 = userRepo.create(mockedUsersListRequest[0]);
    await userRepo.save(listUser1);
    const user1 = await userRepo.findOneBy({ nick: "nickTest1" });

    const listUser2 = userRepo.create(mockedUsersListRequest[1]);
    await userRepo.save(listUser2);
    const user2 = await userRepo.findOneBy({ nick: "nickTest2" });

    const response = await request(app).get(baseUrl).send({ nick: user2.nick });

    const expectedResults = {
      status: 401,
      bodyToEqual: { message: "Invalid token" },
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(expectedResults.bodyToEqual);
  });
});
