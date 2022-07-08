import axios from "axios";
import { IToken, TokenService } from "./tokenService/tokenService";

const api = axios.create({
  baseURL: "https://dogsapi.origamid.dev/json",
});

api.interceptors.request.use((config) => {
  const token = TokenService.getTokenFromStorage();
  const configUpdated = config;

  if (token && configUpdated.headers) {
    configUpdated.headers.Authorization = `Bearer ${token}`;
  }

  return configUpdated;
});

api.interceptors.response.use((success) => {
  const { config, data } = success;

  if (config.url?.includes("/jwt-auth/v1/token") && config.method === "post") {
    const token = data.token as IToken;
    if (token) {
      TokenService.setTokenToStorage(token);
    }
  }

  return success;
});

export { api };
