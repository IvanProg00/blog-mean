import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { AllNewsComponent } from './news/all-news/all-news.component';

const routes: Routes = [
  { path: "", component: AllNewsComponent },
  { path: "create", component: AddNewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
