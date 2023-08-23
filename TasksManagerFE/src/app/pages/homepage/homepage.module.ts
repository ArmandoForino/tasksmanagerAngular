import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HomepageRoutingModule } from './homepage-routing.module';
import { NbButtonModule, NbIconModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomepageComponent,
    DashboardComponent
  ],
  imports: [
    HomepageRoutingModule,
    NbIconModule,
    NbButtonModule,
    SharedModule,
    CommonModule
  ]
})
export class HomepageModule { }
