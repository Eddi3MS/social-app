import axios from "axios";

const api = axios.create({
  baseURL: "https://dogsapi.origamid.dev/json/",
});

api.interceptors.request.use((config) => {
  const token = "getTokenHere";
  const configUpdated = config;

  if (token && configUpdated.headers) {
    configUpdated.headers.Authorization = `Bearer ${token}`;
  }

  return configUpdated;
});

// pegar tokens no loggin
/* api.interceptors.response.use((success) => {
  const { config, data } = success;

   if (config.url?.includes("/auth/login") && config.method === "post") {
    const { accessToken, refreshToken } = data as ITokens;
    TokensService.setTokensToStorage({
      accessToken,
      refreshToken,
    });
  } 

  return success;
}); */

export { api };
