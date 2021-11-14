import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SnackBarService} from "./snack-bar.service";
import {environment} from "../../environments/environment";

export interface IUserData {
  localId?: string
  idToken?: string
  email?: string
  refreshToken?: string
  expiresIn?: string
}

export interface RegistrationResponse {
  body?: {
    email?: string
    expiresIn?: string
    idToken?: string;
    kind?: string;
    localId?: string
    refreshToken?: string
  }
  // error?: {
  //   code?: number
  //   message?: string
  //   errors?: [{
  //     message: string
  //     domain: string
  //     reason: string
  //   }]
  // }
}

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  userData: IUserData | {} = {
    email: '',
    expiresIn: '',
    idToken: '',
    localId: '',
    refreshToken: '',
  }
  isAuthenticated: boolean = false

  constructor(
    private http: HttpClient,
    private appSnackbarService: SnackBarService,
  ) {
  }

  ngOnInit(): void {
  }

  register(email: string, password: string) {
    return this.http.post(
      environment.REG_URL,
      {email, password, returnSecureToken: false},
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
  }


  // login() {
  // }
  //
  // logout() {
  // }
  getUserByEmail(email: string) {
    return this.http.post(
      environment.FORGOT_PASSWORD_URL,
      {identifier: email, continueUri: 'http://localhost:4200/auth/forgot-password'},
      {headers: {'Content-Type': 'application/json'}}
    )
  }
}
