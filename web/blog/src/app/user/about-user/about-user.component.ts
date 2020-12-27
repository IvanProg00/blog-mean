import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Response, User } from 'src/app/interfaces';
import { MESSAGE_DURATION } from 'src/assets/config';
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
  public canDelete: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.userService.getRegistred()) {
      this.router.navigate(['/']);
      return;
    }
    this.isRegistred = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.setUser(params.id);
    });
  }

  private setUser(id: string): void {
    this.userService.getUserById(id).subscribe(
      (res: Response) => {
        this.user = res.data;
        this.isLoaded = true;
        this.getMeByToken();
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.router.navigate(['/']);
      }
    );
  }

  private getMeByToken(): void {
    this.userService.getUserByToken().subscribe((res: Response) => {
      if (this.user._id === res.data._id) {
        this.canDelete = true;
      }
    });
  }

  public onDelete() {
    this.userService.deleteUser(this.user._id).subscribe(
      (_: Response) => {
        this.userService.dropToken();

        this.router.navigate(['/']);
        this._snackBar.open('User Deleted', undefined, {
          duration: MESSAGE_DURATION,
        });
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this._snackBar.open("You can't delete this user.", undefined, {
          duration: MESSAGE_DURATION,
        });
      }
    );
  }
}
