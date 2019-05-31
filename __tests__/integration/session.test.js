const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should autenticate with valid credentials", async () => {
    const user = await factory.create('User', {
      password: '123456'
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
    const user = await factory.create('User', {
      password: '123456'
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
    const user = await factory.create('User', {
      password: '123123'
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "123123" //user.password_hash
      });

    expect(response.body).toHaveProperty("token");
  });

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123'
    });

    const response = await request(app)
      .post("/dashboard")
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);

  });

  it('should not be able to access private routes withouth jwt token', async () => {

    const response = await request(app)
      .get('/dashboard');

    expect(response.status).toBe(401);
  });

});
