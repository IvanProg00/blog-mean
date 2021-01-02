import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-user',
  templateUrl: './change-user.component.html',
  styleUrls: ['./change-user.component.scss'],
})
export class ChangeUserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.userService.getUserByToken().subscribe(
      (res: Response) => {

      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this._snackBarService.error("Can't Find User.");
        this.userService.dropToken();
        this.router.navigate(['/']);
      }
    );
  }
}
