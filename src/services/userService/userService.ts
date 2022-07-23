import { AxiosResponse } from "axios";
import { api } from "../api";
import {
  IGetUserDTO,
  IPhotoDTO,
  ISinglePhotoDTO,
  ITokenValidateDTO,
  IUserLoginDTO,
} from "./dtos/userServiceDTO";

interface IGetPhotos {
  page: number;
  total: number;
  user: number;
}

class userService {
  // envia username e password pro servidor e recebe um token + user (sem a ID)
  public static async loginUser(
    body: FormData
  ): Promise<AxiosResponse<IUserLoginDTO>> {
    return api.post<IUserLoginDTO>("/jwt-auth/v1/token", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // checa se o token é valido
  public static async tokenValidate(): Promise<
    AxiosResponse<ITokenValidateDTO>
  > {
    return api.post<ITokenValidateDTO>("/jwt-auth/v1/token/validate");
  }

  // envia o token no header da req e recebe os dados do usuario novamente com a ID
  public static async getUser(): Promise<AxiosResponse<IGetUserDTO>> {
    return api.get<IGetUserDTO>("/api/user");
  }

  public static async createUser(body: FormData): Promise<AxiosResponse> {
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

  public static async postComment(
    id: number,
    comment: object
  ): Promise<AxiosResponse> {
    return api.post(`/api/comment/${id}`, JSON.stringify(comment), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static async getPhotos({
    page,
    total,
    user,
  }: IGetPhotos): Promise<AxiosResponse<IPhotoDTO[]>> {
    return api.get<IPhotoDTO[]>(
      `/api/photo/?_page=${page}&_total=${total}&_user=${user}`
    );
  }

  public static async getSinglePhoto(
    id: number
  ): Promise<AxiosResponse<ISinglePhotoDTO>> {
    return api.get<ISinglePhotoDTO>(`/api/photo/${id}`);
  }
}

export { userService };
