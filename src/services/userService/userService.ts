import { AxiosResponse } from "axios";
import { api } from "../api";

class userService {
  // envia username e password pro servidor e recebe um token + user (sem a ID)
  public static async loginUser(body: any): Promise<AxiosResponse> {
    return api.post("/jwt-auth/v1/token", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // checa se o token é valido
  public static async tokenValidate(): Promise<AxiosResponse> {
    return api.post("/jwt-auth/v1/token/validate");
  }

  // envia o token no header da req e recebe os dados do usuario novamente com a ID
  public static async getUser(): Promise<AxiosResponse> {
    return api.get("/api/user");
  }

  public static async createUser(body: string): Promise<AxiosResponse> {
    return api.post("/api/user", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static async postPhoto(params: FormData): Promise<AxiosResponse> {
    return api.post("/api/photo", params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  public static async getPhoto(): Promise<AxiosResponse> {
    return api.get("/api/photo");
  }

  public static async getSinglePhoto(id: number): Promise<AxiosResponse> {
    return api.get(`/api/photo/${id}`);
  }
}

export { userService };
