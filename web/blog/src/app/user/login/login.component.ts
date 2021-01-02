import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Response, UserLogin } from 'src/app/interfaces';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: UserLogin = {
    username: '',
    password: '',
  };
  public loginForm: FormGroup;
  public error: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private _snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required]),
    });
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.error = null;
    } else {
      this.userService.loginUser(this.loginForm.value).subscribe(
        (res: Response) => {
          this.userService.setToken(res);
          this.userService.setUserByToken();
          this._snackBarService.success('You Are Logined.');
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          if (err.status === 0) {
            this._snackBarService.error("You Can't Login At The Moment.");
            this.router.navigate(['/']);
          } else {
            this.error = err.error?.error;
          }
        }
      );
    }
  }

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
