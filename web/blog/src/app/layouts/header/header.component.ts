import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { BG_COLOR } from 'src/assets/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public color: string = BG_COLOR;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.isLogined();
  }

  private isLogined(): void {
    if (this.userService.getToken()) {
      this.userService.registred = true;
    } else {
      this.userService.registred = false;
    }
  }

  public get isRegistred(): boolean {
    return this.userService.registred;
  }

  public logout(): void {
    this.userService.dropToken();
    this.isLogined();
    this.router.navigate(['/']);
  }
}
