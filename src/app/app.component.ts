import { Component, OnInit } from '@angular/core';
import {AuthService} from "./_services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'B!T works';
  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.autoLogin()
  }
}
