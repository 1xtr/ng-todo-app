import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log('Guard route:', route);
    // console.log('Guard state:', state);
    if (this.auth.isAuthenticated()) {
      return true
    }
    if (route.url[0].path === 't') {
      this.router.navigate(['/auth/login'], {
        fragment: route.params['todoId'],

      }).then()
      return false
    } else {
      this.router.navigate(['/auth/login'], {
        fragment: 'forbidden'
      }).then()
      return false
    }
  }

}
