import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidator} from '../../shared/custom.validator'

@Component({
  selector: 'app-auth-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
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
    ])
  }, {validators: CustomValidator.passwordMatchValidator})


  constructor() {
  }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.regForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.regForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

}
