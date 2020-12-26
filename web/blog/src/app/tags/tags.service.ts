import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlTags } from 'src/assets/config';
import { AddTag } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient) {}

  public getAllTags(): Observable<any> {
    return this.http.get(apiUrlTags);
  }

  public createTag(tag: AddTag): Observable<any> {
    return this.http.post(apiUrlTags, tag);
  }

  public deleteTag(id: string): Observable<any> {
    return this.http.delete(`${apiUrlTags}/${id}`);
  }
}
