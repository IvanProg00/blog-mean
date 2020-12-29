import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutEntriesComponent } from './entries/about-entries/about-entries.component';
import { AddEntriesComponent } from './entries/add-entries/add-entries.component';
import { AllEntriesComponent } from './entries/all-entries/all-entries.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AddTagsComponent } from './tags/add-tags/add-tags.component';
import { AboutUserComponent } from './user/about-user/about-user.component';
import { AllTagsComponent } from './tags/all-tags/all-tags.component';
import { ChangeEntriesComponent } from './entries/change-entries/change-entries.component';
import { ChangeTagsComponent } from './tags/change-tags/change-tags.component';

const routes: Routes = [
  { path: '', component: AllEntriesComponent, pathMatch: 'full' },
  { path: 'entries/create', component: AddEntriesComponent },
  { path: 'entries/about/:id', component: AboutEntriesComponent },
  { path: 'entries/change/:id', component: ChangeEntriesComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/about/:id', component: AboutUserComponent },

  { path: 'tags', component: AllTagsComponent },
  { path: 'tags/create', component: AddTagsComponent },
  { path: 'tags/change/:id', component: ChangeTagsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
