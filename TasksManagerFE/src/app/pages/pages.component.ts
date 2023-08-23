import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS, MENU_ITEMS_PUBLIC } from './pages-menu';
import { AuthService } from '../@core/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '../@core/models/user.model';
import { SubscriptionsService } from '../@core/services/subscriptions.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="($user|async)?menu:menuPublic"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  user: any;

  menu = MENU_ITEMS;
  menuPublic = MENU_ITEMS_PUBLIC;
  $user!: Observable<User | null>;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.$user = this.auth.getUser()
  }

}
