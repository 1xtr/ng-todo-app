import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from "../_services/user.service";
import {IFBUserData} from "../shared/Interfaces";
import {Subscription} from "rxjs";
import {SnackBarService} from "../_services/snack-bar.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userData: IFBUserData | undefined
  allSubs: Subscription | undefined
  tokenExpiresDate: Date | undefined
  userNewName: string | undefined
  inputNameFieldDisabled: boolean | undefined = true

  constructor(
    private userService: UserService,
    private alert: SnackBarService,
  ) {
  }

  ngOnInit(): void {
    this.tokenExpiresDate = new Date(localStorage.getItem('xtr-fb-token-expDate') as string)
    this.fetchUserData()
  }

  fetchUserData() {
    const gSub = this.userService.getUserInfo()
      .subscribe(({users}) => {
        this.userData = users[0]
        this.userNewName = this.userData?.displayName
      })
    this.allSubs?.add(gSub)
  }

  inputHandler(event: Event) {
    this.userNewName = (<HTMLInputElement>event.target).value
  }

  updateUserName() {
    console.log('update')
    this.inputNameFieldDisabled = true
    const uSub = this.userService.changeUserInfo(this.userNewName)
      .subscribe({
        next: () => this.alert.success('Update info success!'),
        error: (err) => {
          console.log('Update info failed:', err)
          this.alert.error('Update info failed!')
        },
        complete: () => {
          this.fetchUserData()
        }
      })
    this.allSubs?.add(uSub)
  }

  ngOnDestroy(): void {
    if (this.allSubs) {
      this.allSubs.unsubscribe()
    }
  }
}