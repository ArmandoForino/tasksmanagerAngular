import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsComponent } from './tags.component';
import { ActionComponent } from './action/action.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: TagsComponent,
    title: 'Tags',
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
export class TagsRoutingModule { }
