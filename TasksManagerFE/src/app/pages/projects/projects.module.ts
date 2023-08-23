import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectComponent } from './components/project/project.component';
import { ProjectsComponent } from './projects.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ActionComponent } from './action/action.component';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectsComponent,
    ListComponent,
    DetailComponent,
    ActionComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbCheckboxModule,
    NbInputModule,
    SharedModule,
    ReactiveFormsModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
