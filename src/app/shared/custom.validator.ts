import {AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidator {
  static passwordMatch(controlName: string, matchControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup: FormGroup | FormArray | null = control.parent
      const password = formGroup?.get(controlName)?.value
      const confirmPassword = formGroup?.get(matchControlName)?.value
      if (password !== confirmPassword) {
        return {'noPasswordMatch': true}
      }
      return null
    }
  }

}
