import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {mergeMap, Observable, Subscription, switchMap} from "rxjs";
import {SnackBarService} from "../_services/snack-bar.service";
import {TodosService} from "../_services/todos.service";
import {ISharedTodo, ITodo} from "../shared/Interfaces";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  initialState!: ITodo;
  sharedTodo!: ITodo;
  allSubs: Subscription | undefined
  displayedColumns: string[] = ['position', 'task', 'actions'];
  isLoading: boolean = true;
  isWriteable: boolean = false;

  constructor(
    private alert: SnackBarService,
    private route: ActivatedRoute,
    public auth: AuthService,
    public todosService: TodosService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const todo$ = this.route.paramMap.pipe(
      switchMap(params => {
        const todoId = params.get('todoId')
        return this.todosService.getSharedTodoOwnerId(todoId as string)
      }),
      switchMap((response: Record<string, ISharedTodo>) => {
        const todoId = Object.keys(response).toString()
        const user_id = Object.entries(response)[0][1].user_id
        return this.todosService.getSharedTodoByOwnerId(todoId, user_id)
      }),
    )
      .subscribe({
        next: (response) => {
          console.log('todo', response)
          this.sharedTodo = this.initialState = response
          this.isWriteable = this.sharedTodo.writeable
          this.isLoading = false
        },
        error: () => {
          this.alert.error('Shared todo not found')
          this.router.navigate(['/']).then()
        }
      })

    this.allSubs?.add(todo$)

  }

  click() {
    return this.todosService.getSharedTodoOwnerId('-MpQsltPzoXyPAz5lZcl')
      .pipe(
        mergeMap((response: Record<string, ISharedTodo>): Observable<any> => {
          const todoId = Object.keys(response).toString()
          const user_id = Object.entries(response)[0][1].user_id
          return this.todosService.getSharedTodoByOwnerId(todoId, user_id)
        })
      ).subscribe(console.log)
    // this.listService.getAllShared().subscribe(response => console.log('QQQ', response))
  }

}
