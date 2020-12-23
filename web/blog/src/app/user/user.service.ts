import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, User, UserLogin, UserRegister } from '../interfaces';
import { apiUrlLogin, apiUrlUsers } from 'src/assets/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public registred: boolean = false;
  public user: User = {
    _id: '',
    email: '',
    privelages: null,
    username: '',
  };

  constructor(private http: HttpClient) {}

  public registerUser(user: UserRegister): Observable<any> {
    return this.http.post(apiUrlUsers, user);
  }

  public loginUser(user: UserLogin): Observable<any> {
    return this.http.post(apiUrlLogin, user);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(res: Response): void {
    localStorage.setItem('token', res.data.token);
    this.setRegistred();
  }

  public dropToken(): void {
    localStorage.removeItem('token');
    this.setRegistred();
  }

  public getRegistred(): boolean {
    return this.registred;
  }

  public setRegistred(): void {
    if (this.getToken()) {
      this.registred = true;
    } else {
      this.registred = false;
    }
  }

  public getUserByToken(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${apiUrlLogin}/${token}`);
  }

  public setUser(): void {
    this.getUserByToken().subscribe((res: Response) => {
      this.user = res.data;
    });
  }

  public getUser(): User {
    return this.user;
  }
}
