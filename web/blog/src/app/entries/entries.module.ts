import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllEntriesComponent } from './all-entries/all-entries.component';
import { AddEntriesComponent } from './add-entries/add-entries.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutEntriesComponent } from './about-entries/about-entries.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AllEntriesComponent, AddEntriesComponent, AboutEntriesComponent],
  exports: [],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule, RouterModule, SharedModule],
})
export class EntriesModule {}
