export interface KakaoCodeResponse {
  code?: string;
  state?: string;
  error?: string;
  error_description?: string;
}

export interface KakaoTokenResponse {
  token_type: string;
  access_token: string;
  id_token?: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope?: string;
}
