import { AxiosResponse } from "axios";
import { api } from "../api";

class userService {
  public static async getUser(): Promise<AxiosResponse> {
    return api.get("/api/user");
  }

  public static async loginUser(body: any): Promise<AxiosResponse> {
    return api.post("/jwt-auth/v1/token", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static async createUser(body: any): Promise<AxiosResponse> {
    return api.post("/api/user", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static async postPhoto(body: any): Promise<AxiosResponse> {
    return api.post("/api/photo", body, {
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
