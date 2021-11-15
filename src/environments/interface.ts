export interface Environment {
  production: boolean
  API_KEY: string
  REG_URL: string
  LOGIN_URL: string
  FORGOT_PASSWORD_URL: string
  CHECK_EMAIL_EXIST_URL: string
  REFRESH_TOKEN_URL: string
  GET_USER_DATA_URL: string
  firebaseConfig: {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
  }
}
