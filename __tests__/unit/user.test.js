const bcrypt = require("bcryptjs");

const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should encrypt user password", async () => {
    const user = await User.create({
      name: "Silvio",
      email: "silvio@gmail.com",
      password: "123456"
    });

    const hash = await bcrypt.hash('123123', 8);

    console.log("##>> hash: " + hash);

    const compareHash = await bcrypt.compare("123456", user.password_hash);
    expect(compareHash).toBe(true);
  });
});
