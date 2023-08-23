import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../../../@core/models/project.model';
import { Tag } from '../../../@core/models/tag.model';
import { Task } from '../../../@core/models/task.model';
import { ProjectsService } from '../../../@core/services/projects.service';
import { SubscriptionsService } from '../../../@core/services/subscriptions.service';
import { TagsService } from '../../../@core/services/tags.service';
import { TasksService } from '../../../@core/services/tasks.service';

@Component({
  selector: 'ngx-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit, OnDestroy {

  id!: number;
  projectId: number|null = null;

  isAddMode: boolean = false;
  tasksActionForm!: FormGroup;
  task!: Task|undefined;
  $tagsList!: Observable<Tag[] | null>;
  $projectsList!: Observable<Project[] | null >;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private subs: SubscriptionsService,
    private tagsService: TagsService,
    private projectsService: ProjectsService
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe(this)
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.subs.add(this,this.route.queryParams.subscribe(params => {
      this.projectId = params['projectId'];
    }))

    this.isAddMode = !this.id;
    this.$tagsList = this.tagsService.getUserTags();
    this.$projectsList = this.projectsService.getUserProjectsByStatus('active');

    this.tasksActionForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null),
      dueDate: new FormControl(null),
      tagsList: new FormControl(null),
      project: new FormControl(Number(this.projectId)||null, Validators.required),
    })

    if(!this.isAddMode){
      this.subs.add(this, this.tasksService.getTasksById(this.id).subscribe({
        next: (result) => {
          this.task = result;
          this.task.tagsList = this.task.Tags.map((t) => {
            return t.id;
          })
          this.task.project = this.task.ProjectId;


          this.tasksActionForm.get("title")!.setValue(this.task.title);
          this.tasksActionForm.get("content")!.setValue(this.task.content);
          this.tasksActionForm.get("dueDate")!.setValue(this.task.dueDate);
          this.tasksActionForm.get("tagsList")!.setValue(this.task.tagsList);
          this.tasksActionForm.get("project")!.setValue(this.task.project);
        },
        error: (error) => {
          console.log(error);
        }
      }))
    }
  }

  onSubmit = () => {
    if(this.isAddMode){
      return this.subs.add(this, this.tasksService.create(this.tasksActionForm.value))
    }
    return this.subs.add(this, this.tasksService.update(this.id, this.tasksActionForm.value))
  }

}
