import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionComponent } from './action/action.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '',
    title: 'Progetti',
    component: ProjectsComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'new',
        component: ActionComponent,
      },
      {
        path: 'edit/:id',
        component: ActionComponent,
      },
      {
        path: ':id',
        component: DetailComponent,
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
