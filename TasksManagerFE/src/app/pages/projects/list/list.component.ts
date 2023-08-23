import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../../../@core/auth/auth.service';
import { Project } from '../../../@core/models/project.model';
import { User } from '../../../@core/models/user.model';
import { ProjectsService } from '../../../@core/services/projects.service';
import { SubscriptionsService } from '../../../@core/services/subscriptions.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  $user!: Observable<User | null>;
  $projectsList!: Observable<Project[] | null>;

  constructor(private auth: AuthService, private projectsService: ProjectsService, private subs: SubscriptionsService) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe(this)
  }

  ngOnInit(): void {
    this.$user = this.auth.getUser();
    this.$projectsList = this.projectsService.getUserProjects();
  }

  onDeletedProject = (deleted:any) => {
    this.$projectsList = this.$projectsList.pipe(map(
      (list:any)=>{
        return list.filter((project:Project) => project.id!=deleted.id);
      }
    ))
    //this.$projectssList = this.$projectssList?.filter((project) => project.id!=deleted.id);
  }

}

