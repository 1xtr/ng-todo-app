import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {IUserData} from "../shared/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  tokenData = { // for localStorage
    id: 'xtr-fb-token',
    expire: 'xtr-fb-token-expDate',
    refresh: 'xtr-fb-token-refresh',
  }
  userData: IUserData | undefined = {}

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getUserByEmail(email: string): Observable<any> {
    return this.http.post<any>(
      environment.FORGOT_PASSWORD_URL,
      {identifier: email, continueUri: 'http://localhost:4200/auth/forgot-password'},
      {headers: {'Content-Type': 'application/json'}}
    )
  }

  getUserInfo() {
    this.http.post(
      environment.GET_USER_DATA_URL,
      {idToken: localStorage.getItem(this.tokenData.id)})
      .subscribe(response => {
        console.log('Get user data', response)
      })
  }







}
