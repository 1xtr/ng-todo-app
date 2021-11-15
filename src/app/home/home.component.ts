import { Component, OnInit } from '@angular/core';
import {ILoginResponseData, UserService} from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: ILoginResponseData | {} | undefined
  constructor(private appUserService: UserService) { }

  ngOnInit(): void {
    this.user = this.appUserService.userData
  }

}
