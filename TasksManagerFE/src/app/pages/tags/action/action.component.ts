import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tag } from '../../../@core/models/tag.model';
import { SubscriptionsService } from '../../../@core/services/subscriptions.service';
import { TagsService } from '../../../@core/services/tags.service';

@Component({
  selector: 'ngx-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit, OnDestroy {

  id!: number;
  isAddMode: boolean = false;
  tagsActionForm!: FormGroup;
  tag!: Tag|undefined;
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private tagsService: TagsService,
    private subs: SubscriptionsService
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe(this)
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.tagsActionForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      color: new FormControl(null),
      description: new FormControl(null)
    })

    if(!this.isAddMode){
      this.subs.add(this, this.tagsService.getTagsById(this.id).subscribe({
        next: (result) => {
          this.tag = result;
          this.tagsActionForm.get("name")!.setValue(this.tag.name);
          this.tagsActionForm.get("color")!.setValue(this.tag.color);
          this.tagsActionForm.get("description")!.setValue(this.tag.description);
        },
        error: (error) => {
          console.log(error);
        }
      }))
    }
  }

  onSubmit = () => {
    if(this.isAddMode){
      return this.subs.add(this, this.tagsService.create(this.tagsActionForm.value))
    }
    return this.subs.add(this, this.tagsService.update(this.id, this.tagsActionForm.value))
  }
}

