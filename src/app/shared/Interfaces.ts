export interface IUserData {
  id?: string
  email?: string
  token?: string
  displayName?: string
  refreshToken?: string
}

export interface IRegistrationResponseData {
  email: string,
  expiresIn: string
  idToken: string,
  kind: string,
  localId: string,
  refreshToken: string,
}

export interface ILoginResponseData {
  displayName: string
  email: string
  expiresIn: string
  idToken: string
  kind: string
  localId: string
  refreshToken: string
  registered: string
}

export interface IForgotPasswordResponseData {
  kind: string,
  allProviders: string[],
  registered: boolean,
  sessionId: string,
  signinMethods: string[]
}

export interface IRefreshTokenResponseData {
  access_token: string
  expires_in: string
  token_type: string
  refresh_token: string
  id_token: string
  user_id: string
  project_id: string
}

export interface UserLoginForm {
  email: string
  password: string
}

export interface ILoginErrorArray {
  [forbidden: string]: string
}
