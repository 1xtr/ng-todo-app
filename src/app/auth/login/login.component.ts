import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../_services/user.service";
import {SnackBarService} from "../../_services/snack-bar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  showPasswordToggle = true

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  getErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  constructor(
    private appUserService: UserService,
    private appSnackbarService: SnackBarService,
    private router: Router,
  ) { }



  loginFormSubmit() {
    if (this.loginForm.invalid) {
      return this.appSnackbarService.warning('Form invalid!')
    }
    const {email, password} = this.loginForm.value
    this.appUserService.login(email, password)
      .subscribe({
        next: (response) => {
          this.appUserService.userData = response
          this.appUserService.isAuthenticated = true
          this.appSnackbarService.success(`Login success!`)
        },
        error: () => {
            this.appSnackbarService.error('Email or password incorrect!')
        },
        complete: () => {
          this.loginForm.reset()
          this.router.navigate(['/'], {queryParams: {isAuthenticated: true}}).then()
        }
      })


  }
}
