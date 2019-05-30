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
      password: "123456"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "123456" //user.password_hash
      });

    expect(response.status).toBe(200);
  });

  it("should autenticate with invalid credentials", async () => {
    const user = await User.create({
      name: "silvio",
      email: "silvio@gmail.com",
      password: "123456"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "12345611" //user.password_hash
      });

    expect(response.status).toBe(401);
  });


  it('should return jwt toker when authenticated', async () => {
    const user = await User.create({
      name: "silvio",
      email: "silvio@gmail.com",
      password: "123123"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "123123" //user.password_hash
      });

    expect(response.body).toHaveProperty("token");
  });

});
