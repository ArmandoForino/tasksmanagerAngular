import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../@core/auth/auth.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'homepage',
      loadChildren: () => import('./homepage/homepage.module')
        .then(m => m.HomepageModule),
    },
    {
      path: 'tasks',
      canActivate: [AuthGuard],
      loadChildren: () => import('./tasks/tasks.module')
        .then(m => m.TasksModule),
    },
    {
      path: 'profile',
      canActivate: [AuthGuard],
      loadChildren: () => import('./profile/profile.module')
        .then(m => m.ProfileModule),
    },
    {
      path: 'tags',
      canActivate: [AuthGuard],
      loadChildren: () => import('./tags/tags.module')
        .then(m => m.TagsModule),
    },
    {
      path: 'projects',
      canActivate: [AuthGuard],
      loadChildren: () => import('./projects/projects.module')
        .then(m => m.ProjectsModule),
    },
    // {
    //   path: 'auth',
    //   loadChildren: () => import('./auth/auth.module')
    //     .then(m => m.AuthModule),
    // },
    {
      path: '',
      redirectTo: 'homepage',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
