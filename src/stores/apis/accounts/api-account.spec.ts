import axios from "axios";
import * as FixtureAccounts from "z@Fixtures/accounts/fixture-account";
import * as APIAccount from "./api-account";

jest.mock("axios", () => ({
  get: jest.fn(),
  put: jest.fn(),
}));

describe("[APIAccount]", () => {
  let mockAxiosGet: jest.SpyInstance;
  let mockAxiosPut: jest.SpyInstance;

  beforeEach(() => {
    mockAxiosGet = jest.spyOn(axios, "get");
    mockAxiosPut = jest.spyOn(axios, "put");
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe("[getAccountByIdAPI]", () => {
    const account = FixtureAccounts.accounts[0];
    it("should trigger axios.get with /accounts/:id endpoint", async () => {
      expect(mockAxiosGet).toHaveBeenCalledTimes(0);
      await APIAccount.getAccountByIdAPI(account.token!, account._id!);
      expect(mockAxiosGet).toHaveBeenCalledTimes(1);
      expect(mockAxiosGet).toHaveBeenCalledWith(
        expect.stringMatching(/\/accounts\//),
        { headers: { Authorization: "Bearer token" } }
      );
    });
  });

  describe("[getAccountsAPI]", () => {
    it("should trigger axios.get with /accounts endpoint", async () => {
      expect(mockAxiosGet).toHaveBeenCalledTimes(0);
      await APIAccount.getAccountsAPI(FixtureAccounts.accounts[0].token!);
      expect(mockAxiosGet).toHaveBeenCalledTimes(1);
      expect(mockAxiosGet).toHaveBeenCalledWith(
        expect.stringMatching(/\/accounts$/),
        { headers: { Authorization: "Bearer token" } }
      );
    });
  });

  describe("[getAccountByIdAPI]", () => {
    it("should trigger axios.get with /accounts/:id endpoint", async () => {
      expect(mockAxiosGet).toHaveBeenCalledTimes(0);
      await APIAccount.getAccountByIdAPI(
        FixtureAccounts.accounts[0].token!,
        FixtureAccounts.accounts[0]._id!
      );
      expect(mockAxiosGet).toHaveBeenCalledTimes(1);
      expect(mockAxiosGet).toHaveBeenCalledWith(
        expect.stringMatching(/\/accounts\/[a-zA-Z1-9]{1,}$/),
        { headers: { Authorization: "Bearer token" } }
      );
    });
  });

  describe("[putAccountByIdAPI]", () => {
    it("should trigger axios.get with /accounts/:id endpoint", async () => {
      expect(mockAxiosGet).toHaveBeenCalledTimes(0);
      await APIAccount.putAccountByIdAPI(
        FixtureAccounts.accounts[0].token!,
        FixtureAccounts.accounts[0]._id!,
        FixtureAccounts.accounts[0]
      );
      expect(mockAxiosPut).toHaveBeenCalledTimes(1);
      expect(mockAxiosPut).toHaveBeenCalledWith(
        expect.stringMatching(/\/accounts\/[a-zA-Z1-9]{1,}$/),
        FixtureAccounts.accounts[0],
        { headers: { Authorization: "Bearer token" } }
      );
    });
  });
});
