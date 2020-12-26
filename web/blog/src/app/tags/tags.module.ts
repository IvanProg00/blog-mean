import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { AddTagsComponent } from './add-tags/add-tags.component';
import { AllTagsComponent } from './all-tags/all-tags.component';

@NgModule({
  declarations: [AddTagsComponent, AllTagsComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class TagsModule {}
