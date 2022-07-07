type ISetTokenToStorageParams = string;

export type IToken = string;

class TokenService {
  public static setTokenToStorage(token: ISetTokenToStorageParams): void {
    localStorage.setItem("@EMS.social-app", token);
  }

  public static getTokenFromStorage(): IToken | null {
    const token = localStorage.getItem("@EMS.social-app");

    if (token) {
      return token;
    }

    return null;
  }

  public static logout(): void {
    localStorage.removeItem("@EMS.social-app");
  }
}

export { TokenService };
