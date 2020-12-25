import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { Response, User } from 'src/app/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss'],
})
export class AboutUserComponent implements OnInit {
  private messageDuration: number = 1500;
  public user: User = {
    _id: '',
    email: '',
    privelages: null,
    username: '',
  };
  public isRegistred: boolean = false;
  public isLoaded: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.userService.getRegistred()) {
      this.router.navigate(['/']);
    }
    this.isRegistred = true;
    this.userService.getUserByToken().subscribe((res: Response) => {
      this.user = res.data;
      this.isLoaded = true;
    });
  }

  public onDelete() {
    this.userService.deleteUser(this.user._id).subscribe((_: Response) => {
      this.userService.dropToken();

      const snackBar: MatSnackBarRef<TextOnlySnackBar> = this._snackBar.open(
        'User Deleted'
      );
      setTimeout(() => {
        snackBar.dismiss();
        this.router.navigate(['/']);
      }, this.messageDuration);
    });
  }
}
