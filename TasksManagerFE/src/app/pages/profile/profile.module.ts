import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { DetailComponent } from './detail/detail.component';
import { ActionComponent } from './action/action.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbUserModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent,
    DetailComponent,
    ActionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbUserModule,
    NbCardModule,
    NbIconModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
