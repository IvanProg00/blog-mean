import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() mainColor;

  constructor(private userService: UserService) {}

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
  }
}
