import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.isAuthenticated()) {
      request = request.clone({
        setParams: {
          auth: this.auth.token as string
        }
      })
    }
    return next.handle(request)
      .pipe(
        catchError((err) => {
          console.log('[Interceptor error]:', err)
          if (err.status === 401) {
            this.auth.logout()
            this.router.navigate(['/auth/login']).then()
          }
          return throwError(err)
        })
      );
  }
}
