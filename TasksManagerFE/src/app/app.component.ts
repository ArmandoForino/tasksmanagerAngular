/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { SubscriptionsService } from './@core/services/subscriptions.service';
import { AuthService } from './@core/auth/auth.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private analytics: AnalyticsService, private seoService: SeoService, private subs: SubscriptionsService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    if(!this.auth.isAuthenticated()) {
      console.log('refreshing')
      this.subs.add(this, this.auth.refreshToken().subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe(this)
  }
}
