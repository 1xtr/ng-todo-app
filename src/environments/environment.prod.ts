import { Environment } from "./interface";

export const environment: Environment = {
  production: true,
  API_KEY: 'AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  LOGIN_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  REG_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  FORGOT_PASSWORD_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  CHECK_EMAIL_EXIST_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  REFRESH_TOKEN_URL: 'https://securetoken.googleapis.com/v1/token?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  GET_USER_DATA_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  firebaseConfig: {
    apiKey: "AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y",
    authDomain: "test-project-67b13.firebaseapp.com",
    projectId: "test-project-67b13",
    storageBucket: "test-project-67b13.appspot.com",
    messagingSenderId: "344370951376",
    appId: "1:344370951376:web:6fb86c1deee5d761431ad5"
  }
};
