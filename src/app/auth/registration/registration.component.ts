import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidator} from '../../shared/custom.validator'
import {Router} from "@angular/router";
import {SnackBarService} from "../../_services/snack-bar.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-auth-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnDestroy {
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
  regSub: Subscription | undefined

  constructor(
    private auth: AuthService,
    private appSnackbarService: SnackBarService,
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
    this.auth.register(email, password)
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

  ngOnDestroy(): void {
    if (this.regSub) {
        this.regSub.unsubscribe()
    }
  }

}
