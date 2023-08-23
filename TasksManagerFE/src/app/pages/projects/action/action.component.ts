import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../../../@core/models/project.model';
import { ProjectsService } from '../../../@core/services/projects.service';
import { SubscriptionsService } from '../../../@core/services/subscriptions.service';

@Component({
  selector: 'ngx-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit, OnDestroy {

  id!: number;
  isAddMode: boolean = false;
  projectsActionForm!: FormGroup;
  project!: Project|undefined;
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private subs: SubscriptionsService
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe(this)
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.projectsActionForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      status: new FormControl(false),
      description: new FormControl(null)
    })

    if(!this.isAddMode){
      this.subs.add(this, this.projectsService.getProjectById(this.id).subscribe({
        next: (result) => {
          this.project = result;
          this.projectsActionForm.get("name")!.setValue(this.project.name);
          this.projectsActionForm.get("status")!.setValue(this.project.status);
          this.projectsActionForm.get("description")!.setValue(this.project.description);
        },
        error: (error) => {
          console.log(error);
        }
      }))
    }
  }

  onSubmit = () => {
    if(this.isAddMode){
      return this.subs.add(this, this.projectsService.create(this.projectsActionForm.value))
    }
    return this.subs.add(this, this.projectsService.update(this.id, this.projectsActionForm.value))
  }
}

