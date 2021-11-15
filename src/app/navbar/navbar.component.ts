import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  logoutButtonHandler() {
    this.auth.logout()
    this.router.navigate(['/']).then()
  }

}
