const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");
const { DB_HOST_TEST, PORT } = process.env;

const User = require("../../models/user");

describe("test login route", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  beforeAll(async () => {
    const registerData = {
      name: "Ann",
      email: "ann115@mail.com",
      password: "1234567",
    };
    await request(app).post("/api/users/register").send(registerData);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test correct login data", async () => {
    const loginData = {
      email: "ann115@mail.com",
      password: "1234567",
    };
    const subscription = "starter";

    const { body, statusCode } = await request(app).post("/api/users/login").send(loginData);

    expect(statusCode).toBe(200);

    expect(body.user.email).toBe(loginData.email);
    expect(typeof body.user.email).toBe("string");

    expect(body.user.subscription).toBe(subscription);
    expect(typeof body.user.subscription).toBe("string");

    expect(body.token).toBeDefined();
    expect(typeof body.token).toBe("string");
  });
});
