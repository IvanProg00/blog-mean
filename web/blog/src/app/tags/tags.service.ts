import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlTags } from 'src/assets/config';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient) {}

  public getAllTags(): Observable<any> {
    return this.http.get(apiUrlTags);
  }
}
