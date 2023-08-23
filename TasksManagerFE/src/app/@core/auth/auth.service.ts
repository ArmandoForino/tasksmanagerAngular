import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { USER } from '../configs/endpoints';
import {  Observable, of, BehaviorSubject} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NO_AUTH } from './auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  private static accessToken: string = '';

  constructor(private http: HttpClient, private router: Router, private jwt: JwtHelperService) {}

  setAccessToken = (token: string) => {
    AuthService.accessToken = token;
  }

  getAccessToken =  () => {
    return AuthService.accessToken
  }

  register = (email:string, name:string, password:string) => {
    return this.http.post(USER.CREATE, {email, name, password}, {context: new HttpContext().set(NO_AUTH, true), withCredentials:true})
  }

  login = (email:string, password:string) => {
    return this.http.post(USER.LOGIN, {email, password}, {context: new HttpContext().set(NO_AUTH, true),withCredentials:true})
  }

  logout = (route:string = '/auth') => {
    return this.http.post(USER.LOGOUT, {}, {withCredentials:true})
    .subscribe((data:any) => {
      this.setUser(null)
      this.router.navigate([route])
    })
  }

  isAuthenticated = () : boolean => {
    const accessToken = AuthService.accessToken;

    if(accessToken && !this.jwt.isTokenExpired(accessToken)) {
      this.user.next(this.getUserFromToken(accessToken))
      return true;
    }

    this.user.next(null)
    return false;
  }


  // all'init dell'applicazione, o nell'interceptor se la request non va a buon fine, tenta il refresh dell'access token
  refreshToken = () : Observable<string|null> => {
    // -> interceptor
    return this.http.post(USER.REFRESH, {}, {withCredentials:true}).pipe(
      map((data: any) => {
        this.setUser(data.access)
        return data.access;
      }),
      catchError((res) => {
        this.setUser(null)
        return of(null);
      })
    )
  }

  getUser = () : Observable<User|null> => {
    return this.user.asObservable();
  }

  setUser = (token: string|null) => {
    this.setAccessToken(token||'')
    if(token===null) {
      return this.user.next(null);
    }
    const user = this.getUserFromToken(token);
    return this.user.next(user);
  }

  private getUserFromToken = (token:string) : User => {
    const decodedToken = this.jwt.decodeToken(token);
    return {
      email: decodedToken.email,
      name: decodedToken.name,
      id: decodedToken.id
    }
  }
}
