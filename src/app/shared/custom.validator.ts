// import { FormGroup } from '@angular/forms';
//
// export function ConfirmedValidator(controlName: string, matchingControlName: string){
//   return (formGroup: FormGroup) => {
//     const control = formGroup.controls[controlName];
//     const matchingControl = formGroup.controls[matchingControlName];
//     if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
//       return;
//     }
//     if (control.value !== matchingControl.value) {
//       matchingControl.setErrors({ confirmedValidator: true });
//     } else {
//       matchingControl.setErrors(null);
//     }
//   }
// }

import {AbstractControl, ValidationErrors} from "@angular/forms";

export class CustomValidator {
  static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password: string = control.get('password')?.value
    const confirmPassword: string = control.get('confirmPassword')?.value
    if (password !== confirmPassword) {
      return ({NoPasswordMatch: true});
    }
    return null
  }
}
