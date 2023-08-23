import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TaskComponent],
  imports: [
    RouterModule,
    NbCardModule,
    NbButtonModule,
    CommonModule
  ],
  exports: [TaskComponent]
})
export class TaskModule { }
