import { HttpErrorResponse } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response, User } from 'src/app/interfaces';
import { UserService } from 'src/app/user/user.service';
import { BG_COLOR, ROOT_PRIVELEGES } from 'src/assets/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, DoCheck {
  public color: string = BG_COLOR;
  public tagPrivelages: number = ROOT_PRIVELEGES;
  public user: User = {
    _id: '',
    username: '',
    email: '',
    privelages: null,
  };

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const userByToken = this.userService.getUserByToken();
    if (!userByToken) return;
    userByToken.subscribe((res: Response) => {
      this.user = res.data;
      this.userService.setUser(this.user);
      this.userService.setRegistred();
    }, (err: HttpErrorResponse) => {
      console.error(err);
      this.userService.dropToken();
    });
  }

  ngDoCheck() {
    this.user = this.userService.getUser();
  }

  public get isRegistred(): boolean {
    return this.userService.getRegistred();
  }

  public logout(): void {
    this.userService.dropToken();
    this.router.navigate(['/']);
  }
}
