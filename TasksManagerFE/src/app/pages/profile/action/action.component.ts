import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../../@core/services/profile.service';
import { NgForm } from '@angular/forms';
import { User } from '../../../@core/models/user.model';
import { SubscriptionsService } from '../../../@core/services/subscriptions.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../@core/auth/auth.service';

@Component({
  selector: 'ngx-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit, OnDestroy {

  $user!: Observable<User | null> ;

  constructor(private auth: AuthService, private subs: SubscriptionsService, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.$user = this.auth.getUser()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe(this);
  }

  onSubmit = (form: NgForm) => {
    const password = form.value.password;
    const name = form.value.name;

    this.subs.add(this, this.profileService.editProfile({password, name}))
  }
}
