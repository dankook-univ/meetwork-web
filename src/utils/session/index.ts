declare module 'iron-session' {
  interface IronSessionData {
    token?: {
      accessToken: string;
      refreshToken: string;
    };
  }
}

export {};
