import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/models/user.model';
import { HomeService } from '../../../@core/services/home.service';
import { SubscriptionsService } from '../../../@core/services/subscriptions.service';
import { ignoreElements, catchError } from 'rxjs/operators';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  $user!: Observable<User | null>;
  tasksDate = new Date();
  $tasksList!: Observable<Task[] | null>;

  constructor(private auth: AuthService, private homeService: HomeService, private subs: SubscriptionsService) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe(this);
  }

  ngOnInit(): void {
    this.subs.add(this, this.homeService.generateDailyTasks(this.tasksDate))

    this.$user =this.auth.getUser();
    this.$tasksList = this.homeService.getDailyTasks();
  }

  changeDay = (interval: number) => {
    this.tasksDate = (new Date(this.tasksDate.setDate(this.tasksDate.getDate() + interval)))
    this.subs.add(this, this.homeService.generateDailyTasks(this.tasksDate))
  }

}
