import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrlEntries } from '../../assets/config';
import { Observable } from 'rxjs';
import { ChangeEntry, Entry } from '../interfaces';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class EntriesService {
  constructor(private http: HttpClient, private userService: UserService) {}

  public getAllEntries(): Observable<any> {
    return this.http.get<any>(apiUrlEntries);
  }

  public getEntry(id: string): Observable<any> {
    return this.http.get<any>(`${apiUrlEntries}/${id}`);
  }

  public createEntry(entrie: Entry): Observable<any> {
    const token: string = this.userService.getToken();
    return this.http.post<any>(apiUrlEntries, { ...entrie, token });
  }

  public changeEntry(entry: ChangeEntry): Observable<any> {
    return this.http.put(`${apiUrlEntries}/${entry._id}`, {
      ...entry,
      token: this.userService.getToken(),
    });
  }

  public deleteEntry(id: string): Observable<any> {
    const token: string = this.userService.getToken();
    return this.http.request<string>('delete', `${apiUrlEntries}/${id}`, {
      body: {
        token: token,
      },
    });
  }
}
