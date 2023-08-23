import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../../../@core/auth/auth.service';
import { Tag } from '../../../@core/models/tag.model';
import { User } from '../../../@core/models/user.model';
import { SubscriptionsService } from '../../../@core/services/subscriptions.service';
import { TagsService } from '../../../@core/services/tags.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  $user!: Observable<User | null>;
  $tagsList!: Observable<Tag[] | null>;

  constructor(private auth: AuthService, private tagsService: TagsService, private subs: SubscriptionsService) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe(this)
  }

  ngOnInit(): void {
    this.$user = this.auth.getUser();
    this.$tagsList = this.tagsService.getUserTags();
  }

  onDeletedTag = (deleted:any) => {
    this.$tagsList = this.$tagsList.pipe(map(
      (list:any)=>{
        return list.filter((tag:Tag) => tag.id!=deleted.id);
      }
    ))
    //this.$tagssList = this.$tagssList?.filter((tag) => tag.id!=deleted.id);
  }

}
