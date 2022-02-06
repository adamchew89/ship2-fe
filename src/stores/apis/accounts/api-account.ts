import axios from "axios";
import { Account } from "z@Types/type-account";
import { ResponseAPI } from "z@Types/type-api";

export const getAccountByIdAPI = async (
  token: string,
  id: number
): Promise<ResponseAPI<Account>> =>
  await axios.get(`${process.env.REACT_APP_BASE_URL}/accounts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAccountsAPI = async (
  token: string
): Promise<ResponseAPI<Account[]>> =>
  await axios.get(`${process.env.REACT_APP_BASE_URL}/accounts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createAccountAPI = async (
  token: string,
  id: number,
  account: Account
): Promise<ResponseAPI<Account>> =>
  await axios.post(`${process.env.REACT_APP_BASE_URL}/accounts`, account, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const putAccountByIdAPI = async (
  token: string,
  id: number,
  account: Account
): Promise<ResponseAPI<Account>> =>
  await axios.put(`${process.env.REACT_APP_BASE_URL}/accounts/${id}`, account, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
