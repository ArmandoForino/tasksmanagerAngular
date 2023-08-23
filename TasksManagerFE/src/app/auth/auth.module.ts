import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { NbAlertModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { AuthComponent } from './auth.component';
import { ThemeModule } from '../@theme/theme.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    AuthRoutingModule,
    FormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,
    CommonModule
  ]
})
export class AuthModule { }
