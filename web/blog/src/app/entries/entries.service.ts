import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrlEntries } from '../../assets/config';
import { Entries } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntriesService {
  constructor(private http: HttpClient) {}

  public getAllEntries(): Observable<any> {
    return this.http.get<any>(apiUrlEntries);
  }
}
