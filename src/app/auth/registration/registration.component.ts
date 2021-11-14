import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidator} from '../../shared/custom.validator'
import {Router} from "@angular/router";
import {UserService} from "../../_services/user.service";
import {SnackBarService} from "../../_services/snack-bar.service";

@Component({
  selector: 'app-auth-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  showPasswordToggle = true
  regForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8}/),
      Validators.maxLength(25),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      CustomValidator.passwordMatch('password', 'confirmPassword')
    ])
  })


  constructor(
    private appSnackbarService: SnackBarService,
    private appUserService: UserService,
    private router: Router) {
  }

  getErrorMessage() {
    if (this.regForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.regForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  regFormSubmit() {
    if (this.regForm.invalid) {
      return this.appSnackbarService.warning('Registration failed, form invalid!')
    }
    const {email, password} = this.regForm.value
    this.appUserService.register(email, password)
      .subscribe({
          next: () => {
            this.appSnackbarService.success('Registration success!')
          },
          error: ({error}) => {
            if (error.error.message === 'EMAIL_EXISTS') {
              this.appSnackbarService.error('Registration failed because email already exists!')
            }
          },
          complete: () => {
            this.regForm.reset()
            this.router.navigate(['/auth/login']).then()
          }
        }
      )
  }

}
