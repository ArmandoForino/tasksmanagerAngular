import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Project } from '../../../../@core/models/project.model';
import { ProjectsService } from '../../../../@core/services/projects.service';
import { SubscriptionsService } from '../../../../@core/services/subscriptions.service';

@Component({
  selector: 'ngx-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnDestroy {
  @Input() project!: Project|undefined|null;
  @Input() isDetail: boolean = false;

  @Output() deletedProject = new EventEmitter<Project>();

  constructor(private subs: SubscriptionsService, private projectsService: ProjectsService) { }


  ngOnDestroy(): void {
    this.subs.unsubscribe(this)
  }

  deleteProject = (id:number) => {
    this.subs.add(this, this.projectsService.delete(id).subscribe({
      next: (deleted:any) => {
        this.deletedProject.emit(deleted);
      },
      error: (error:any) => {
        console.log(error);
      }
    }));
  }

}
