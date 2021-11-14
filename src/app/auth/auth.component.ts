import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isForgotPasswordPage: boolean = false
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.router.url === '/auth/forgot-password') {
      this.isForgotPasswordPage = true
    }
  }

}
