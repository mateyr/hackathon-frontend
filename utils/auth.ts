import { getItemTyped, removeItem, setItemTyped } from "./storage";

const TOKEN = "token";

export type AuthToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export const getToken = () => getItemTyped<AuthToken>(TOKEN);
export const setToken = (value: AuthToken) =>
  setItemTyped<AuthToken>(TOKEN, value);
export const removeToken = () => removeItem(TOKEN);
