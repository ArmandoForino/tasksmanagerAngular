import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/models/user.model';
import { Task } from '../../../@core/models/task.model';
import { TasksService } from '../../../@core/services/tasks.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() $data : any = null;

  $tasksList!: Observable<Task[] | null>;

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {

    this.$tasksList = this.tasksService.getUserTasks();

  }
}
