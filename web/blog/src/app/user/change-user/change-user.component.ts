import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChangeUser, Response } from 'src/app/interfaces';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-user',
  templateUrl: './change-user.component.html',
  styleUrls: ['./change-user.component.scss'],
})
export class ChangeUserComponent implements OnInit {
  private changeUser: ChangeUser = {
    _id: '',
    email: '',
    username: '',
  };
  public userForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBarService: SnackBarService
  ) {
    this.userForm = new FormGroup({
      _id: new FormControl(this.changeUser._id, [Validators.required]),
      username: new FormControl(this.changeUser.username, [
        Validators.required,
      ]),
      email: new FormControl(this.changeUser.email, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.compareUserByToken(params.id);
    });
  }

  private compareUserByToken(id: string) {
    this.userService.getUserByToken().subscribe(
      (res: Response) => {
        if (res.data._id !== id) {
          this._snackBarService.error("You Can't Change This User.");
          this.router.navigate(['/']);
          return;
        }

        this._id.setValue(res.data._id);
        this.username.setValue(res.data.username);
        this.email.setValue(res.data.email);
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this._snackBarService.error("Can't Find User.");
        this.userService.dropToken();
        this.router.navigate(['/']);
      }
    );
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.changeUser(this.userForm.value).subscribe(
        (_: Response) => {
          this._snackBarService.success('User Changed.');
          this.router.navigate(['/user/about', this._id.value]);
          this.userService.setUserByToken();
        },
        (err: HttpErrorResponse) => {
          console.error(err.error.error);
          if (err.status === 0) {
            this._snackBarService.error("You Can't Change User At The Moment.");
            this.router.navigate(['/']);
          } else {
            if (err.error?.error?.username) {
              this.username.setErrors({ other: err.error?.error?.username });
            }
            if (err.error?.error?.email) {
              this.email.setErrors({ other: err.error?.error?.email });
            }
          }
        }
      );
    }
  }

  get _id(): AbstractControl {
    return this.userForm.get('_id');
  }

  get username(): AbstractControl {
    return this.userForm.get('username');
  }

  get email(): AbstractControl {
    return this.userForm.get('email');
  }
}
