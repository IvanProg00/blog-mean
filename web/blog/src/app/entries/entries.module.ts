import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllEntriesComponent } from './all-entries/all-entries.component';
import { AddEntriesComponent } from './add-entries/add-entries.component';

@NgModule({
  declarations: [AllEntriesComponent, AddEntriesComponent],
  exports: [],
  imports: [CommonModule],
})
export class EntriesModule {}
