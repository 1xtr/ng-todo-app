import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../_services/user.service";
import {SnackBarService} from "../../_services/snack-bar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../_services/auth.service";
import {Subscription} from "rxjs";
import {ILoginErrorArray} from "../../shared/Interfaces";

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  showPasswordToggle = true
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })
  loginSub: Subscription | undefined
  getErrorMessages: ILoginErrorArray = {
    forbidden: 'Access denied, need authorization',
  }

  getErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  constructor(
    private auth: AuthService,
    private appUserService: UserService,
    private appSnackbarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.fragment.subscribe((hash: keyof ILoginErrorArray | null) => {
      if (hash) {
        this.appSnackbarService.warning(this.getErrorMessages[hash])
      }
    })
  }

  loginFormSubmit() {
    if (this.loginForm.invalid) {
      return this.appSnackbarService.warning('Form invalid!')
    }
    this.loginSub = this.auth.login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          this.appUserService.userData = {...response}
          this.appSnackbarService.success(`Login success!`)
        },
        error: () => {
          this.appSnackbarService.error('Email or password incorrect!')
        },
        complete: () => {
          this.loginForm.reset()
          this.router.navigate(['/']).then()
        }
      })
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe()
    }
  }

}
