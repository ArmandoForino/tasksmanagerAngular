import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { SubscriptionsService } from '../../@core/services/subscriptions.service';
import { TasksService } from '../../@core/services/tasks.service';
import { Task } from '../../@core/models/task.model';

@Component({
  selector: 'ngx-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task|undefined|null;
  @Input() isDetail: boolean = false;
  @Input() showProject: boolean = true;

  @Output() deletedTasks = new EventEmitter<Task>();

  taskTagsClass: string = '';
  constructor(private tasksService: TasksService, private subs: SubscriptionsService) { }

  ngOnInit(): void {
    this.taskTagsClass = this.task.Tags.map((tag)=>{return 'tag_'+tag.id}).join(' ');
  }

  deleteTask = (id:number) => {
    this.subs.add(this, this.tasksService.delete(id).subscribe({
      next: (deleted:any) => {
        this.deletedTasks.emit(deleted);
      },
      error: (error) => {
        console.log(error);
      }
    }));
  }

}
