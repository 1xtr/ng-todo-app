import {Environment} from "./interface";

export const environment: Environment = {
  production: false,
  API_KEY: 'AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  firebaseConfig: {
    apiKey: "AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y",
    authDomain: "test-project-67b13.firebaseapp.com",
    projectId: "test-project-67b13",
    storageBucket: "test-project-67b13.appspot.com",
    messagingSenderId: "344370951376",
    appId: "1:344370951376:web:6fb86c1deee5d761431ad5"
  },
  APP_URL: 'http://localhost:4200',
  LOGIN_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  REG_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  FORGOT_PASSWORD_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  CHECK_EMAIL_EXIST_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  REFRESH_TOKEN_URL: 'https://securetoken.googleapis.com/v1/token?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  GET_USER_DATA_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  UPDATE_USER_DATA_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  FB_DB_URL: 'https://test-project-67b13-default-rtdb.europe-west1.firebasedatabase.app/angular-todo-app',
  FB_TODOS_DB_URL: 'https://test-project-67b13-default-rtdb.europe-west1.firebasedatabase.app/angular-todo-app/todos',
  FB_SHARED_DB_URL: 'https://test-project-67b13-default-rtdb.europe-west1.firebasedatabase.app/angular-todo-app/shared',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
