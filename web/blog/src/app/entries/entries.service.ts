import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrlEntries } from '../../assets/config';
import { Observable } from 'rxjs';
import { Entrie } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class EntriesService {
  constructor(private http: HttpClient) {}

  public getAllEntries(): Observable<any> {
    return this.http.get<any>(apiUrlEntries);
  }

  public createEntrie(entrie: Entrie): Observable<any> {
    return this.http.post<any>(apiUrlEntries, entrie);
  }
}
