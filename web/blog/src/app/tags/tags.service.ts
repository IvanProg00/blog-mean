import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlTags } from 'src/assets/config';
import { AddTag, ChangeTag } from 'src/app/interfaces';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient, private userService: UserService) {}

  public getAllTags(): Observable<any> {
    return this.http.get(apiUrlTags);
  }

  public getTag(id: string): Observable<any> {
    return this.http.get(`${apiUrlTags}/${id}`);
  }

  public createTag(tag: AddTag): Observable<any> {
    return this.http.post(apiUrlTags, tag);
  }

  public changeTag(tag: ChangeTag): Observable<any> {
    return this.http.put(`${apiUrlTags}/${tag._id}`, {
      ...tag,
      token: this.userService.getToken(),
    });
  }

  public deleteTag(id: string): Observable<any> {
    const token = this.userService.getToken();
    return this.http.request<string>('delete', `${apiUrlTags}/${id}`, {
      body: {},
    });
  }
}
