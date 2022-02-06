import { Account } from "z@Types/type-account";
import { Credential } from "z@Types/type-auth";

export const accounts: Account[] = [
  {
    _id: 1,
    name: "name1",
    mobile: "mobile1",
    token: "token",
  },
  {
    _id: 2,
    name: "name2",
    mobile: "mobile2",
    token: "token",
  },
  {
    _id: 3,
    name: "name3",
    mobile: "mobile3",
    token: "token",
  },
];

export const credentials: Credential[] = [{ mobile: "mobile1", pin: "880880" }];
