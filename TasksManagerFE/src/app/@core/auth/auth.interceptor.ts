import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse,
  HttpContextToken
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators'
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export const NO_AUTH = new HttpContextToken(()=>false)

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refreshed = false
  constructor(private auth: AuthService, private jwt: JwtHelperService, private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      // Questo mi serve per escludere dove non serve l'interceptor
      if(request.context.get(NO_AUTH) === true) {
        return next.handle(request)
      }
      
      const accessToken = this.auth.getAccessToken();

      // setto l'header authorization con il token access
      const newRequest = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.auth.getAccessToken()}`
        }
      })

      // invio la richiesta clonata con il nuovo header
      return next.handle(newRequest).pipe(
        catchError((err: HttpErrorResponse) => {
          // se l'errore è di tipo 401, non autorizzato, e non è stato già tentato un refresh
          // allora provo il refresh
          if(err.status === 401 && !this.refreshed) {
            this.refreshed = true;
            return this.auth.refreshToken().pipe(
              switchMap((res:any) => {
                return next.handle(request.clone({
                  setHeaders: {
                    'Authorization': `Bearer ${this.auth.getAccessToken()}`
                  }
                }));
              })
            )
          }
          this.refreshed=false;
          return throwError(() => err)
        })
      );







  }
}
