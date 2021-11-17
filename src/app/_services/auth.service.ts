import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {
  ILoginResponseData,
  IRefreshTokenResponseData,
  IRegistrationResponseData,
  UserLoginForm
} from "../shared/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenData = {
    id: 'xtr-fb-token',
    expire: 'xtr-fb-token-expDate',
    refresh: 'xtr-fb-token-refresh',
    userId: 'xtr-fb-user-id',
  }

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    const expDate = new Date(localStorage.getItem(this.tokenData.expire) as string)
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem(this.tokenData.id)
  }

  register(email: string, password: string): Observable<IRegistrationResponseData | HttpErrorResponse> {
    return this.http.post<IRegistrationResponseData>(
      environment.REG_URL,
      {email, password, returnSecureToken: false}
    )
  }

  login(user: UserLoginForm): Observable<ILoginResponseData> {
    return this.http.post<ILoginResponseData>(
      environment.LOGIN_URL,
      {...user, returnSecureToken: true}
    )
      .pipe(
        tap((res) => {
          this.setToken(res)
          return res
        }),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет')
        break
    }
    return throwError(() => error)
  }

  private setToken(response: ILoginResponseData | IRefreshTokenResponseData | null) {
    if (response) {
      localStorage.clear()
      console.log('Set token: ', response)
      const expDate = new Date(new Date().getTime() + 3600000).toString()
      localStorage.setItem(
        this.tokenData.userId,
        (<ILoginResponseData>response).localId || (<IRefreshTokenResponseData>response).user_id)
      localStorage.setItem(
        this.tokenData.id,
        (<ILoginResponseData>response).idToken || (<IRefreshTokenResponseData>response).id_token)
      localStorage.setItem(
        this.tokenData.refresh,
        (<ILoginResponseData>response).refreshToken || (<IRefreshTokenResponseData>response).refresh_token)
      localStorage.setItem(this.tokenData.expire, expDate)
    } else {
      localStorage.clear()
    }
  }

  private refreshToken(): Observable<IRefreshTokenResponseData> {
    const refreshToken = localStorage.getItem(this.tokenData.refresh) as string
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken)
    return this.http.post<IRefreshTokenResponseData>(
      environment.REFRESH_TOKEN_URL,
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
  }

  refreshSession() {
    if (!this.isAuthenticated()) {
      this.refreshToken().subscribe({
          next: (response) => {
            this.setToken(response)
          },
          error: (err) => {
            console.log('Refresh token error', err)
          }
        }
      )
    }
  }

  sendForgotPassword(email: string) {
    return this.http.post(
      environment.FORGOT_PASSWORD_URL,
      {'requestType': 'PASSWORD_RESET', 'email': email}
    )
  }

}
