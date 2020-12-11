import { registerLocaleData } from '@angular/common';
import { Input, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEntriesComponent } from './entries/add-entries/add-entries.component';
import { AllEntriesComponent } from './entries/all-entries/all-entries.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: '', component: AllEntriesComponent, pathMatch: 'full' },
  { path: 'create', component: AddEntriesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
