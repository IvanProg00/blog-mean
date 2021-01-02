import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Response, UserRegister } from 'src/app/interfaces';
import { UserService } from '../user.service';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private user: UserRegister = {
    username: '',
    email: '',
    password: '',
  };
  public registerForm: FormGroup;
  public error: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private _snackBarService: SnackBarService
  ) {
    this.registerForm = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required]),
    });
  }

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      this.error = null;
    } else {
      this.userService.registerUser(this.registerForm.value).subscribe(
        (res: Response) => {
          this.userService.setToken(res);
          this.userService.setUserByToken();
          this._snackBarService.success('You Are Registred.');
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          if (err.status === 0) {
            this._snackBarService.error("You Can't Register At The moment.");
            this.router.navigate(['/']);
          } else {
            if (err.error?.error?.username) {
              this.username.setErrors({ other: err.error?.error?.username });
            }
            if (err.error?.error?.email) {
              this.email.setErrors({ other: err.error?.error?.email });
            }
            if (err.error?.error?.password) {
              this.password.setErrors({ other: err.error?.error?.password });
            }
          }
        }
      );
    }
  }

  get username(): AbstractControl {
    return this.registerForm.get('username');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }
  get password(): AbstractControl {
    return this.registerForm.get('password');
  }
}
