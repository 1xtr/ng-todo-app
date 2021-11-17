import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from 'rxjs';
import {SnackBarService} from '../_services/snack-bar.service';
import {TodoListService} from "../_services/todo-list.service";
import {ICreateListResponse} from "../shared/Interfaces";

@Component({
  selector: 'app-create-todo-list',
  templateUrl: './create-todo-list.component.html',
  styleUrls: ['./create-todo-list.component.scss']
})
export class CreateTodoListComponent implements OnInit, OnDestroy {
  allSubs: Subscription | undefined
  createTListForm: FormGroup = new FormGroup({
    listName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  })

  constructor(
    private listService: TodoListService,
    private alert: SnackBarService) {
  }

  ngOnInit(): void {
  }

  createTListHandler() {
    if (this.createTListForm.invalid) {
      return
    }
    const crSub = (<Observable<ICreateListResponse>>this.listService.create(this.createTListForm.value.listName))
      .subscribe({
        next: (response) => {
          if (response.name) {
            const pSub = this.listService.patchListId(response.name)
              .subscribe((response) => {
                console.log('Patch id response', response)
              })
            this.allSubs?.add(pSub)
            this.alert.success('Todo list successfully created!')
            this.createTListForm.reset()
          }
        },
        error: (err) => {
          console.log('Create list error: ', err)
          this.alert.error('Create list failed')
        }
      })
    this.allSubs?.add(crSub)
  }

  ngOnDestroy(): void {
    if (this.allSubs) {
      this.allSubs.unsubscribe()
    }
  }
}
