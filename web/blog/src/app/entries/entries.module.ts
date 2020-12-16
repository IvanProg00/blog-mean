import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllEntriesComponent } from './all-entries/all-entries.component';
import { AddEntriesComponent } from './add-entries/add-entries.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutEntriesComponent } from './about-entries/about-entries.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../layouts/loading/loading.component';

@NgModule({
  declarations: [AllEntriesComponent, AddEntriesComponent, AboutEntriesComponent, LoadingComponent],
  exports: [],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule, RouterModule],
})
export class EntriesModule {}
