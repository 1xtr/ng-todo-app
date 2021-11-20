import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from 'rxjs';
import {SnackBarService} from '../_services/snack-bar.service';
import {TodoListService} from "../_services/todo-list.service";
import {ICreateListResponse, ITodoList} from "../shared/Interfaces";
import { StoreService } from '../_services/store.service';

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
    private alert: SnackBarService,
    private store: StoreService,
    ) {
  }

  ngOnInit(): void {
  }

  createTListHandler() {
    if (this.createTListForm.invalid) {
      return
    }
    const userId = localStorage.getItem('xtr-fb-user-id') as string
    const currTime: Date = new Date()
    const list: ITodoList = {
      create_date: currTime,
      owner_id: userId,
      title: this.createTListForm.value.listName,
      last_modify: {
        user_id: userId,
        date: currTime,
      },
      tasks: {}
    }
    const crSub = (<Observable<ICreateListResponse>>this.listService.createTodoList(list))
      .subscribe({
        next: (response) => {
          if (response.name) {
            this.store.newTodoList$.next({ [response.name]: list})
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
