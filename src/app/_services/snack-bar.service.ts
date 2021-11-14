import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

interface ISnackBarTypes {
  error: string
  info: string
  success: string
  warning: string
}
const SnackBarType: ISnackBarTypes = {
  error: 'error-xtr-snack-bar',
  info: 'info-xtr-snack-bar',
  success: 'success-xtr-snack-bar',
  warning: 'warning-xtr-snack-bar'
}

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackbar: MatSnackBar, private zone: NgZone) {
  }

  private show(message: string, type: keyof ISnackBarTypes): void {
    this.zone.run(() => {
      this.snackbar.open(
        message,
        'x',
        {panelClass: ['xtr-snackbar-container', SnackBarType[type]]},
        // {panelClass: ['snackbar-container', type]},
      );
    });
  }

  error(message: string) {
    this.show(message, 'error')
  }

  info(message: string) {
    this.show(message, 'info')
  }

  success(message: string) {
    this.show(message, 'success')
  }
  warning(message: string) {
    this.show(message, 'warning')
  }

}
