import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(private auth: AuthService, private router: Router) {

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.auth.isAuthenticated()) {
      return true;
    }

    return this.auth.refreshToken().pipe(
      map((res:any)=>{
        if(res) {
          return true
        }
        return this.router.parseUrl('/auth/login');
      }
    ));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.isAuthenticated()) {
        return true;
      }

      return this.auth.refreshToken().pipe(
        map((res:any)=>{
          if(res) {
            return true
          }
          return this.router.parseUrl('/auth/login');
        }
      ));


  }

}
