import { Router } from "@angular/router";
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Response, UserRegister, UserRegisterError } from 'src/app/interfaces';
import { INVALID_FORM } from 'src/assets/config';
import { UserService } from '../user.service';

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

  constructor(private router: Router, private userService: UserService) {
    this.registerForm = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required]),
    });
  }

  public onSubmit(): void {
    if (this.registerForm.status === INVALID_FORM) {
      this.error = null;
    } else {
      this.userService
        .registerUser(this.registerForm.value)
        .subscribe((a: Response) => {
          this.userService.setToken(a);
          this.router.navigate(["/"]);
          this.userService.registred = true;
        });
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
