import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TAGS } from '../configs/endpoints';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient, private router: Router) {}

  getUserTags = () : Observable<Tag[]> => {
    return this.http.get<Tag[]>(`${TAGS.USER}/`);
  }

  getTagsById = (id:number) : Observable<Tag> => {
    return this.http.get<Tag>(`${TAGS.MAIN}/${id}`);
  }

  delete = (id:number) => {
    return this.http.delete(`${TAGS.MAIN}/${id}`);
  }

  create = (payload:Tag, route:string='/tags') => {
    return this.http.post(`${TAGS.CREATE}`, { ...payload }).subscribe((data:any) => {
      this.router.navigate([route]);
    })
  }

  update = (id:number,payload:Tag, route:string='/tags') => {
    return this.http.patch(`${TAGS.MAIN}/${id}`, { ...payload }).subscribe((data:any) => {
      this.router.navigate([route]);
    })
  }

}
