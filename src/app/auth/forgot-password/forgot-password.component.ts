import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SnackBarService} from "../../_services/snack-bar.service";
import { AuthService } from 'src/app/_services/auth.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnDestroy{
  forgotForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  fSub: Subscription | undefined
  constructor(
    private auth: AuthService,
    private appSnackbarService: SnackBarService,
  ) {
  }

  submit() {
    const {email} = this.forgotForm.value;
    this.fSub = this.auth.sendForgotPassword(email).subscribe(() => {
      // we always send a request even if the mail does not exist ащк security reason
      this.appSnackbarService.info('Request was send to your email')
    })
  }

  ngOnDestroy(): void {
    if (this.fSub) {
        this.fSub.unsubscribe()
    }
  }
}
