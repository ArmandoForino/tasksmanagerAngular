import { Injectable } from '@angular/core';
import { TasksService } from './tasks.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  dailyTasksList = new BehaviorSubject<Task[] | null>(null);

  constructor(private tasksService: TasksService) { }

  getDailyTasks = () : Observable<Task[]|null> => {
    return this.dailyTasksList.asObservable();
  }

  generateDailyTasks = (day:Date) => {
    return this.tasksService.getTasksByDate({dueDate: day}).subscribe({
      next: (data:any) => {
        this.dailyTasksList.next(data);
      },
      error: (err) => {
        console.log(err.error.errorMsg)
      }
    })
  }
}
