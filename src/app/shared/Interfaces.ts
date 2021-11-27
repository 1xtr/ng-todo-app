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

export interface IGetUserDataResponse {
  kind: string,
  users: IFBUserData[]
}

export interface IUpdateProfileResponse {
  kind: string,
  localId: string,
  email: string,
  displayName: string,
  providerUserInfo: [
    {
      providerId: string,
      displayName: string,
      photoUrl: string,
      federatedId: string,
      email: string,
      rawId: string
    }
  ],
  photoUrl: string,
  passwordHash: string,
  emailVerified: boolean
}

export interface IFBUserData {
  localId: string,
  displayName?: string,
  email: string,
  passwordHash: string,
  emailVerified: false,
  passwordUpdatedAt: number,
  providerUserInfo: [
    {
      providerId: string,
      federatedId: string,
      email: string,
      rawId: string
    }
  ],
  validSince: string,
  lastLoginAt: string,
  createdAt: string,
  lastRefreshAt: string
}

export interface UserLoginForm {
  email: string
  password: string
}

export interface ILoginErrorArray {
  [forbidden: string]: string
}

export interface ITodo {
  id?: string
  title: string
  owner_id: string
  create_date: Date
  last_modify_date: Date
  last_modify_user_id: string
  provided?: string[]
  isShared: boolean
  share_url: string
  writeable: boolean,
  tasks: Record<string, ITask>,
  isActive?: boolean,
  tempTaskName?: string,
}

export interface ITask {
  id?: string
  title?: string
  isDone?: boolean
}

export interface IFBPostResponse {
  name: string
}

export interface FBObjData<Type> {
  [key: string]: Type
}

export interface ISharedTodo {
  user_id: string
}
