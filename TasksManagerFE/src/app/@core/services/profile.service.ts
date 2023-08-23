import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { USER } from '../configs/endpoints';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private auth: AuthService, private http: HttpClient) {}

  editProfile = (payload:any) => {
    return this.http.patch(`${USER.MAIN}/edit`, payload)
    .pipe(map(() => {
      this.auth.logout();
    }))
    .subscribe()
  }
}
