import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PROJECTS } from '../configs/endpoints';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { Router } from '@angular/router';
import { TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projectTasksList = new BehaviorSubject<Task[] | null>(null);

  constructor(private tasksService: TasksService, private http: HttpClient, private router: Router) {}

  getUserProjects = () : Observable<Project[]> => {
    return this.http.get<Project[]>(`${PROJECTS.USER}/`);
  }

  getUserProjectsByStatus = (status:string) : Observable<Project[]> => {
    return this.http.get<Project[]>(`${PROJECTS.STATUS}/${status}`);
  }

  getProjectById = (id:number) : Observable<Project> => {
    return this.http.get<Project>(`${PROJECTS.MAIN}/${id}`);
  }

  delete = (id:number) => {
    return this.http.delete(`${PROJECTS.MAIN}/${id}`);
  }

  create = (payload:Project, route:string='/projects') => {
    return this.http.post(`${PROJECTS.CREATE}`, { ...payload }).subscribe((data:any) => {
      this.router.navigate([route]);
    })
  }

  update = (id:number,payload:Project, route:string='/projects') => {
    return this.http.patch(`${PROJECTS.MAIN}/${id}`, { ...payload }).subscribe((data:any) => {
      this.router.navigate([route]);
    })
  }

  getProjectTasks = () : Observable<Task[]|null> => {
    return this.projectTasksList.asObservable();
  }

  generateProjectTasks = (id:number) => {
    return this.tasksService.getTasksByProject(id).subscribe({
      next: (data:any) => {
        this.projectTasksList.next(data);
      }
    })
  }

}
