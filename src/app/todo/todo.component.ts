import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {SnackBarService} from "../_services/snack-bar.service";
import {TodoListService} from "../_services/todo-list.service";
import {ITodoList} from "../shared/Interfaces";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  initialState!: ITodoList;
  sharedTodo!: ITodoList;
  allSubs: Subscription | undefined
  displayedColumns: string[] = ['position', 'task', 'actions'];
  isLoading: boolean = true;

  constructor(
    private alert: SnackBarService,
    private route: ActivatedRoute,
    public auth: AuthService,
    public listService: TodoListService,
  ) {
  }

  ngOnInit(): void {
    const routeSub = this.route.params.subscribe(({fragment}) => {
      if (fragment) {
        this.listService.getSharedTodoByFragment(fragment).subscribe({
          next: ({todoId}) => {
            this.listService.getTodoById(todoId).subscribe(
              (response) => {
                this.sharedTodo = this.initialState = response
                this.isLoading = false
              }
            )
          },
          error: () => this.alert.error('Shared todo not found')
        })
      }
    })
    this.allSubs?.add(routeSub)

  }

}
