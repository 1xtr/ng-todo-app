import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false

  constructor(
    private appUserService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    console.log('before', this.isAuthenticated)
    this.appUserService.isAuthenticated$.subscribe(value => this.isAuthenticated = value)
    console.log('after', this.isAuthenticated)

  }

  logoutButtonHandler() {
    this.appUserService.logout()
    this.router.navigate(['/']).then()
  }

}
