import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../@core/auth/auth.service';
import { User } from '../../@core/models/user.model';
import { SubscriptionsService } from '../../@core/services/subscriptions.service';
import { NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit, OnDestroy {
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
    const name = form.value.name;

    this.subs.add(this, this.auth.register(email, name, password).subscribe({
      next: () => {
          this.router.navigate(['/auth']);
        },
      error: (e) => {
          this.errorMsg = e.error.msg
        }
      })
    );

  }

}
