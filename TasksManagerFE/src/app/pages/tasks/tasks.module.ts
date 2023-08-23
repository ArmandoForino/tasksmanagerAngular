import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { ListComponent } from './list/list.component';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';
import { ActionComponent } from './action/action.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    TasksComponent,
    ListComponent,
    ActionComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbDatepickerModule,
    NbIconModule,
    ReactiveFormsModule,
    SharedModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
