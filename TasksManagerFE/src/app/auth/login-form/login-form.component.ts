import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../@core/auth/auth.service';
import { User } from '../../@core/models/user.model';
import { SubscriptionsService } from '../../@core/services/subscriptions.service';
import { NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  $user!: Observable<User | null>;
  errorMsg: string = '';

  constructor(
    private auth: AuthService,
    private subs: SubscriptionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.$user = this.auth.getUser()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe(this);
  }

  onSubmit = (form: NgForm) => {
    const email = form.value.email;
    const password = form.value.password;

    this.subs.add(this, this.auth.login(email, password)
      .subscribe({
        next: (data:any) => {
          console.log(data)
          this.auth.setUser(data.accessToken)
          this.router.navigate(['/']);
        },
        error: (e) => {
          this.errorMsg = e.error.msg
        }
      })
    );
  }



}
