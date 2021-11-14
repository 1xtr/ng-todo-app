import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../_services/user.service";
import {SnackBarService} from "../../_services/snack-bar.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(
    private appUserService: UserService,
    private appSnackbarService: SnackBarService,
  ) {
  }

  submit() {
    const {email} = this.forgotForm.value;
    this.appUserService.getUserByEmail(email).subscribe(() => {
      // we always send a request even if the mail does not exist ащк security reason
      this.appSnackbarService.info('Request was send to your email')
    })
  }
}
