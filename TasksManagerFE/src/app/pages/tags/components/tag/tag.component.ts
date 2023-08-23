import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Tag } from '../../../../@core/models/tag.model';
import { SubscriptionsService } from '../../../../@core/services/subscriptions.service';
import { TagsService } from '../../../../@core/services/tags.service';

@Component({
  selector: 'ngx-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnDestroy {
  @Input() tag!: Tag|undefined|null;
  @Input() isDetail: boolean = false;

  @Output() deletedTag = new EventEmitter<Tag>();

  constructor(private subs: SubscriptionsService, private tagsService: TagsService) { }



  ngOnDestroy(): void {
    this.subs.unsubscribe(this)
  }

  deleteTag = (id:number) => {
    this.subs.add(this, this.tagsService.delete(id).subscribe({
      next: (deleted:any) => {
        this.deletedTag.emit(deleted);
      },
      error: (error:any) => {
        console.log(error);
      }
    }));
  }

}
