import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { LoadingComponent } from './loading/loading.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  declarations: [LoadingComponent, NotFoundComponent, SnackBarComponent],
  exports: [LoadingComponent],
  imports: [MaterialModule, CommonModule],
})
export class SharedModule {}
