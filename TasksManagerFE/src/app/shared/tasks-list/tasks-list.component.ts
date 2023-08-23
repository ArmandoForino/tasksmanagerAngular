import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../../@core/auth/auth.service';
import { User } from '../../@core/models/user.model';
import { Task } from '../../@core/models/task.model';
import { TasksService } from '../../@core/services/tasks.service';
import { Tag } from '../../@core/models/tag.model';
import { TagsService } from '../../@core/services/tags.service';

@Component({
  selector: 'ngx-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  @Input() projectId : number|null|undefined = null;
  @Input() $data : Observable<Task[] | null> = null;

  @Input() isDetail: boolean = false;
  @Input() showProject: boolean = true;

  $user!: Observable<User | null>;
  $tasksList: Observable<Task[] | null> = null;
  $bkpTasksList: Observable<Task[] | null> = null;
  $tagsList!: Observable<Tag[] | null>;

  constructor(private auth: AuthService, private tasksService: TasksService,private tagsService: TagsService,) {}

  ngOnInit(): void {
    this.$user = this.auth.getUser();
    this.$tagsList = this.tagsService.getUserTags();

    if(this.$data) {
      this.$tasksList = this.$bkpTasksList = this.$data
    }
  }

  onDeletedTasks = (deleted:any) => {
    this.$tasksList = this.$bkpTasksList = this.$bkpTasksList.pipe(map(
      (list:any)=>{
        return list.filter((task:Task) => task.id!=deleted.id);
      }
    ))
  }

  filterByTags(e:any) {
      console.log(e)
      if(e.length!==0) {
        this.$tasksList = this.$bkpTasksList.pipe(map(
          (list:any)=>{
            return list.filter((task:Task) => {
              return task.Tags.find((tag)=>e.includes(tag.id))
            });
          }
        ))
      } else {
        this.$tasksList = this.$bkpTasksList;
      }

  }
}

