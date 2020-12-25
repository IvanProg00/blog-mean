import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  declarations: [LoadingComponent, SnackBarComponent],
  exports: [LoadingComponent],
})
export class SharedModule {}

