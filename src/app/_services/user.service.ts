import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

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

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  userData: ILoginResponseData | {} = {}
  isAuthenticated: boolean = false

  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
  }

  register(email: string, password: string): Observable<IRegistrationResponseData | HttpErrorResponse> {
    return this.http.post<IRegistrationResponseData>(
      environment.REG_URL,
      {email, password, returnSecureToken: false},
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
  }


  login(email: string, password: string): Observable<ILoginResponseData | HttpErrorResponse> {
    return this.http.post<ILoginResponseData>(
      environment.LOGIN_URL,
      {email, password, returnSecureToken: true},
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
  }

  logout() {
    this.isAuthenticated = false
    this.userData = {}
  }

  getUserByEmail(email: string): Observable<IForgotPasswordResponseData> {
    return this.http.post<IForgotPasswordResponseData>(
      environment.FORGOT_PASSWORD_URL,
      {identifier: email, continueUri: 'http://localhost:4200/auth/forgot-password'},
      {headers: {'Content-Type': 'application/json'}}
    )
  }
}
