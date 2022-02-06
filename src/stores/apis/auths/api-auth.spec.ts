import axios from "axios";
import * as FixtureAccount from "z@Fixtures/accounts/fixture-account";
import * as APIAuth from "./api-auth";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe("[APIAuth]", () => {
  let mockAxiosGet: jest.SpyInstance;
  let mockAxiosPost: jest.SpyInstance;

  beforeEach(() => {
    mockAxiosGet = jest.spyOn(axios, "get");
    mockAxiosPost = jest.spyOn(axios, "post");
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe("[loginAPI]", () => {
    it("should trigger axios.post with /auth endpoint", async () => {
      expect(mockAxiosPost).toHaveBeenCalledTimes(0);
      await APIAuth.loginAPI(FixtureAccount.credentials[0]);
      expect(mockAxiosPost).toHaveBeenCalledTimes(1);
      expect(mockAxiosPost).toHaveBeenCalledWith(
        expect.stringMatching(/\/auth/),
        FixtureAccount.credentials[0]
      );
    });
  });

  describe("[verifyTokenAPI]", () => {
    it("should trigger axios.post with /auth/:id/verifyToken endpoint", async () => {
      const mockId = FixtureAccount.accounts[0]._id!;
      expect(mockAxiosGet).toHaveBeenCalledTimes(0);
      await APIAuth.verifyTokenAPI(mockId, FixtureAccount.accounts[0].token!);
      expect(mockAxiosGet).toHaveBeenCalledTimes(1);
      expect(mockAxiosGet).toHaveBeenCalledWith(
        expect.stringMatching(/\/auth\/[a-zA-Z1-9]{1,}\/verifyToken/),
        { headers: { Authorization: "Bearer token" } }
      );
    });
  });
});
