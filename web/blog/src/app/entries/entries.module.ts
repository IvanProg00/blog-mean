import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllEntriesComponent } from './all-entries/all-entries.component';
import { AddEntriesComponent } from './add-entries/add-entries.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AllEntriesComponent, AddEntriesComponent],
  exports: [],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
})
export class EntriesModule {}
