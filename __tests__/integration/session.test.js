const request = require("supertest");

const app = require("../../src/app");
const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should autenticate with valid credentials", async () => {
    const user = await User.create({
      name: "silvio",
      email: "silvio@gmail.com",
      password_hash: "123456"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: user.password_hash
      });

    expect(response.status).toBe(200);
  });
});
