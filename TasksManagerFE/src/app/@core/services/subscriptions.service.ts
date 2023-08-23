import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  subscriptions: any = [];

  constructor() { }

  add(component: any, subscription: Subscription) {
    if(!this.subscriptions[component]) {
      this.subscriptions[component] = [];
    }
    this.subscriptions[component].push(subscription)
  }

  unsubscribe(component: any) {
    if(this.subscriptions[component]) {
      this.subscriptions[component].forEach((sub:Subscription) => {
        sub.unsubscribe();
      })
    }
  }
}
