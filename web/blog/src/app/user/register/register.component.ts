import { Router } from '@angular/router';
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Response, UserRegister, UserRegisterError } from 'src/app/interfaces';
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
    if (this.registerForm.invalid) {
      this.error = null;
    } else {
      this.userService
        .registerUser(this.registerForm.value)
        .subscribe((res: Response) => {
          this.userService.setToken(res);
          this.userService.setUser();
          this.router.navigate(['/']);
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
