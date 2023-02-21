import { IUser, IUserRequest } from "../../../../interfaces/users";

const mockedUserRequest: IUserRequest = {
  name: "Zequinha",
  email: "zecs@kenzie.com",
  nick: "DragonSlayer5698",
  password: "12345678",
};

const mockedUserResponse: Omit<IUserRequest, "password"> = {
  name: "Zequinha",
  email: "zecs@kenzie.com",
  nick: "DragonSlayer5698",
};

const mockedUserInvalidBodyRequest: Omit<IUserRequest, "password" | "email"> = {
  name: "Zequinha",
  nick: "DragonSlayer5698",
};

const mockedUsersListRequest = [
  {
    name: "teste1",
    nick: "nickTest1",
    email: "teste1@mail.com",
    password: "1234",
  },
  {
    name: "teste2",
    nick: "nickTest2",
    email: "teste2@mail.com",
    password: "1234",
  },
];

const mockedUsersListResponse = [
  {
    id: expect.any(String),
    name: "teste1",
    nick: "nickTest1",
    email: "teste1@mail.com",
    isActive: true,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    profileImg: expect.any(String),
  },
  {
    id: expect.any(String),
    name: "teste2",
    nick: "nickTest2",
    email: "teste2@mail.com",
    isActive: true,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    profileImg: expect.any(String),
  },
];

const mockedUserNotActiveRequest = {
  name: "teste",
  nick: "nickTest",
  email: "teste@mail.com",
  password: "1234",
};

export {
  mockedUserRequest,
  mockedUserInvalidBodyRequest,
  mockedUsersListRequest,
  mockedUsersListResponse,
  mockedUserNotActiveRequest,
};
