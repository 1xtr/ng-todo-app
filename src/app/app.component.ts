import {Component, OnInit} from '@angular/core';
import {AuthService} from "./_services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'bitworks-test';
  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.auth.refreshSession()
    }, 29 * 60 * 1000)
  }
}
