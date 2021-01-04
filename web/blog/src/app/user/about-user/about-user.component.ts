import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Response, User } from 'src/app/interfaces';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { MESSAGE_DURATION } from 'src/assets/config';
import { UserService } from '../user.service';

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss'],
})
export class AboutUserComponent implements OnInit {
  public user: User = {
    _id: '',
    email: '',
    privelages: null,
    username: '',
  };
  public userFound: boolean = false;
  public isLoaded: boolean = false;
  public canDelete: boolean = false;
  public canChange: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.setUser(params.id);
    });
  }

  private setUser(id: string): void {
    this.userService.getUserById(id).subscribe(
      (res: Response) => {
        this.user = res.data;
        const getUser = this.userService.getUserByToken();
        if (!getUser) {
          this.isLoaded = true;
          this.userFound = true;
          return;
        }
        getUser.subscribe(
          (res: Response) => {
            console.log(res.data)
            if (this.user._id === res.data._id) {
              this.canChange = true;
              this.canDelete = true;
            }
            this.userFound = true;
            this.isLoaded = true;
          },
          (err: HttpErrorResponse) => {
            console.error(err);
            this._snackBarService.error("We Can't Load Your Account.");
            this.userService.dropToken();
          }
        );
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this._snackBarService.error('User Not Found.');
        this.isLoaded = true;
      }
    );
  }

  private userValidation(id: string) {
    const getUser = this.userService.getUserByToken();
    if (getUser) {
      getUser.subscribe(
        (res: Response) => {
          if (this.user._id === res.data._id) {
            this.canChange = true;
            this.canDelete = true;
          }
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.userService.dropToken();
        }
      );
    }
  }

  public onDelete() {
    this.userService.deleteUser(this.user._id).subscribe(
      (_: Response) => {
        this.userService.dropToken();

        this.router.navigate(['/']);
        this._snackBarService.success('User Deleted.');
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this._snackBarService.error("You Can't Delete This User.");
      }
    );
  }
}
