import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TASKS } from '../configs/endpoints';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient, private router: Router) {}

  getUserTasks = () : Observable<Task[]> => {
    return this.http.get<Task[]>(`${TASKS.USER}/`);
  }

  getTasksByProject = (id:number) : Observable<Task[]> => {
    return this.http.get<Task[]>(`${TASKS.PROJECT}/${id}`);
  }

  getTasksById = (id:number) : Observable<Task> => {
    return this.http.get<Task>(`${TASKS.MAIN}/${id}`);
  }

  getTasksByDate = (payload:{ dueDate : Date}) : Observable<Task[]>  => {
    return this.http.post<Task[]>(`${TASKS.DATE}`, { ...payload });
  }

  delete = (id:number) => {
    return this.http.delete(`${TASKS.MAIN}/${id}`);
  }

  create = (payload:Task, route:string='/tasks') => {
    return this.http.post(`${TASKS.CREATE}`, { ...payload }).subscribe((data:any) => {
      this.router.navigate([route]);
    })
  }

  update = (id:number,payload:Task, route:string='/tasks') => {
    return this.http.patch(`${TASKS.MAIN}/${id}`, { ...payload }).subscribe((data:any) => {
      this.router.navigate([route]);
    })
  }

}
