import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../@core/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../../../@core/models/task.model';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent  implements OnInit {

  id!:number;
  $task!: Observable<Task|null|undefined>;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.$task = this.tasksService.getTasksById(this.id)
  }

  onDeletedTask = () => {
    this.router.navigate(['/tasks'])
  }

}
