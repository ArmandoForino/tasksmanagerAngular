import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { TagComponent } from './components/tag/tag.component';
import { ListComponent } from './list/list.component';
import { ActionComponent } from './action/action.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TagsComponent,
    TagComponent,
    ListComponent,
    ActionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    TagsRoutingModule
  ]
})
export class TagsModule { }
