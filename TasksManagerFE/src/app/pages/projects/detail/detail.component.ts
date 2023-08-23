import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../../../@core/models/project.model';
import { ProjectsService } from '../../../@core/services/projects.service';
import { SubscriptionsService } from '../../../@core/services/subscriptions.service';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent  implements OnInit {

  id!:number;
  $project!: Observable<Project|null|undefined>;
  $projectTasksList!: Observable<Task[] | null>;

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router,
    private subs: SubscriptionsService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.subs.add(this, this.projectsService.generateProjectTasks(this.id))

    this.$projectTasksList = this.projectsService.getProjectTasks();
    this.$project = this.projectsService.getProjectById(this.id)
  }

  onDeletedProject = () => {
    this.router.navigate(['/projects'])
  }

}
