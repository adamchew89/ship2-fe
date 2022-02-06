import axios from "axios";
import { Account } from "z@Types/type-account";
import { ResponseAPI } from "z@Types/type-api";
import { Credential } from "z@Types/type-auth";

export const loginAPI = async (
  credential: Credential
): Promise<ResponseAPI<Account>> =>
  await axios.post(`${process.env.REACT_APP_BASE_URL}/auth`, credential);

export const verifyTokenAPI = async (
  id: number,
  token: string
): Promise<ResponseAPI<string>> =>
  await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/${id}/verifyToken`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
