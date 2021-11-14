// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "./interface";

export const environment: Environment = {
  production: false,
  API_KEY: 'AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  LOGIN_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  REG_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
  FORGOT_PASSWORD_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=AIzaSyDC-HkFhPqCnfbb56wxkgAnfPPkhPAHn-Y',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
