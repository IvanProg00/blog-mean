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

  constructor(private router: Router, private userService: UserService) {}

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
        (data: Response) => {
          this.userService.setToken(data);
          this.userService.setUser();
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          this.error = err.error?.error;
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
