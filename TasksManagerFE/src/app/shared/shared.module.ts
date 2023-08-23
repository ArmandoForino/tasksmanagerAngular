import { NgModule } from '@angular/core';
import { TasksListModule } from './tasks-list/tasks-list.module';
import { TaskModule } from './task/task.module';

@NgModule({
  imports: [
    TasksListModule,
    TaskModule
  ],
  exports: [
    TasksListModule,
    TaskModule
  ]
})
export class SharedModule { }
