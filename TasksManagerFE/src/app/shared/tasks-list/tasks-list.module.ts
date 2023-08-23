import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './tasks-list.component';
import { TaskModule } from '../task/task.module';
import { NbSelectModule } from '@nebular/theme';

@NgModule({
  declarations: [
    TasksListComponent
  ],
  imports: [
    TaskModule,
    NbSelectModule,
    CommonModule
  ],
  exports: [
    TasksListComponent
  ]
})
export class TasksListModule { }
