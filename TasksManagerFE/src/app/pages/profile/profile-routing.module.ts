import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { DetailComponent } from './detail/detail.component';
import { ActionComponent } from './action/action.component';

const routes: Routes = [
  {
    path: '',
    title: 'Profilo',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: DetailComponent,
      },
      {
        path: 'edit',
        component: ActionComponent,
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
