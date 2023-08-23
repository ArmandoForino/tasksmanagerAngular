import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [],
  imports: [
    // Non uso JwtModule con una funzione tokengetter ad Hoc perchè voglio provare a scrivere un interceptors
    // Da fare
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: () => localStorage.getItem('access_token'),
    //     allowedDomains: ["localhost:8000"],
    //   },
    // }),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
})
export class AuthModule { }
