import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, UserLogin, UserRegister } from '../interfaces';
import { apiUrlLogin, apiUrlUsers } from 'src/assets/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public registred: boolean = false;
  constructor(private http: HttpClient) {}

  public registerUser(user: UserRegister): Observable<any> {
    return this.http.post(apiUrlUsers, user);
  }

  public loginUser(user: UserLogin): Observable<any> {
    return this.http.post(apiUrlLogin, user);
  }

  public setToken(a: Response): void {
    localStorage.setItem('token', a.data.token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public dropToken() {
    localStorage.removeItem('token');
  }
}
