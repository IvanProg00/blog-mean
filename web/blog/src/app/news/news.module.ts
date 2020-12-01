import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllNewsComponent } from './all-news/all-news.component';
import { AddNewsComponent } from './add-news/add-news.component';



@NgModule({
  declarations: [AllNewsComponent, AddNewsComponent],
  exports: [
    AllNewsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NewsModule { }
