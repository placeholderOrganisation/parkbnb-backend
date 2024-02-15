const app = require("../src/app");

describe("App", () => {
  it("should return the correct port in dev", () => {
    const result = app.default.settings.port;
    expect(result).toBe(3000);
  });
});
