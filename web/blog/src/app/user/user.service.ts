import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  ChangeUser,
  Response,
  User,
  UserLogin,
  UserRegister,
} from '../interfaces';
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
    this.cleanUser();
    this.setRegistred();
  }

  public getRegistred(): boolean {
    this.setRegistred();
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
    if (token) {
      return this.http.get(`${apiUrlLogin}/${token}`);
    }
    return;
  }

  public setUserByToken(): void {
    const userByToken = this.getUserByToken();
    if (userByToken) {
      userByToken.subscribe(
        (res: Response) => {
          this.user = res.data;
          this.setRegistred();
        },
        (err: HttpErrorResponse) => {
          this.dropToken();
          this.setRegistred();
          console.error(err);
        }
      );
    }
  }

  public getUserById(id: string): Observable<any> {
    return this.http.get(`${apiUrlUsers}/${id}`);
  }

  public getUser(): User {
    return this.user;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  private cleanUser(): void {
    this.user = {
      _id: '',
      email: '',
      privelages: null,
      username: '',
    };
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.request<string>('delete', `${apiUrlUsers}/${id}`, {
      body: {
        token: this.getToken(),
      },
    });
  }

  public changeUser(user: ChangeUser): Observable<any> {
    return this.http.put(`${apiUrlUsers}/${user._id}`, {
      ...user,
      token: this.getToken(),
    });
  }
}
