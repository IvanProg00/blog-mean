import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarData } from 'src/app/interfaces';
import { MESSAGE_DURATION } from 'src/assets/config';
import { SnackBarComponent } from './snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  public success(mess: string) {
    const data: SnackBarData = {
      mess: mess,
      type: 'success',
    };

    this._snackBar.openFromComponent(SnackBarComponent, {
      data,
      duration: MESSAGE_DURATION,
    });
  }

  public error(mess: string) {
    const data: SnackBarData = {
      mess: mess,
      type: 'error',
    };

    this._snackBar.openFromComponent(SnackBarComponent, {
      data,
      duration: MESSAGE_DURATION,
    });
  }
}
