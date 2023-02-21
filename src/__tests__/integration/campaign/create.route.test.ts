import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import { Campaign } from "../../../entities/campaign.entity";
import AppDataSource from "../../../data-source";
import { User } from "../../../entities/user.entity";
import { mockedUsersListRequest } from "../mocks/integration/user.mock";
import { mockedCampaignRequest } from "../mocks/integration/campaign.mock";

describe("create campaign route test", () => {
  let connetion: DataSource;
  const baseUrl: string = "/campaign";
  const campaignRepo: Repository<Campaign> =
    AppDataSource.getRepository(Campaign);

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connetion = res))
      .catch((err) => console.error(err));
  });

  beforeEach(async () => {
    const campaign = await campaignRepo.find();
    await campaignRepo.remove(campaign);
  });

  afterAll(async () => {
    await connetion.destroy();
  });

  it("should be able to create a campaign", async () => {
    const listUserOne = userRepo.create(mockedUsersListRequest[1]);
    await userRepo.save(listUserOne);
    const user = await userRepo.findOneBy({ nick: "nickTest2" });

    const userLoggedIn = await request(app)
      .post("/login")
      .send({ email: user.email, password: "1234" });

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userLoggedIn.body.token}`)
      .send(mockedCampaignRequest);

    const expectedResults = {
      status: 201,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        rpgGame: expect.any(String),
        campaignImg: expect.any(String),
        plataform: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        isActive: expect.any(Boolean),
      })
    );
  });
});
