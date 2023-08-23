import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/models/user.model';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  $user!: Observable<User | null> ;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.$user = this.auth.getUser()
  }
}
