import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutUserComponent } from './about-user/about-user.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ChangeUserComponent } from './change-user/change-user.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AboutUserComponent, ChangeUserComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule, RouterModule, SharedModule],
})
export class UserModule {}
