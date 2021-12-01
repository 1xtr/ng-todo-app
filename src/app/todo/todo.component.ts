import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription, switchMap} from "rxjs";
import {SnackBarService} from "../_services/snack-bar.service";
import {TodosService} from "../_services/todos.service";
import {ISharedTodo, ITask, ITodo} from "../shared/Interfaces";
import {SharedService} from "../_services/shared.service";
import {AuthService} from "../_services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {MergeTodoComponent} from "../components/merge-todo/merge-todo.component";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, DoCheck, OnDestroy {
  allSubs: Subscription | undefined
  initialState!: string;
  remoteState!: string;
  sharedTodo!: ITodo;
  sharedTodoId: string | undefined
  sharedTodoOwnerId: string | undefined
  displayedColumns: string[] = ['position', 'task', 'actions'];
  isLoading: boolean = true;
  isWriteable: boolean = false;
  remoteDirty: boolean = false
  localDirty: boolean = false
  localPristine: boolean = !this.localDirty

  constructor(
    private auth: AuthService,
    private alert: SnackBarService,
    private route: ActivatedRoute,
    private todosService: TodosService,
    private sharedService: SharedService,
    private router: Router,
    public dialog: MatDialog,
  ) {
  }

  get random() {
    return '-' + Math.random().toString(36).slice(4) + Math.random().toString(36).slice(3)
  }

  ngOnInit(): void {
    const todo$ = this.route.paramMap.pipe(
      switchMap(params => {
        const todoId = this.sharedTodoId = params.get('todoId') as string
        return this.todosService.getSharedTodoOwnerId(todoId as string)
      }),
      switchMap((response: Record<string, ISharedTodo>) => {
        const todoId = Object.keys(response).toString()
        const user_id = this.sharedTodoOwnerId = Object.entries(response)[0][1].user_id
        return this.todosService.getSharedTodoByOwnerId(todoId, user_id)
      }),)
      .subscribe({
        next: (response) => {
          this.sharedTodo = response
          this.initialState = JSON.stringify(response)
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

  ngDoCheck(): void {
    this.compareStates()
  }

  createTaskHandler(taskName: string) {
    const newTask: Record<string, ITask> = {[this.random]: {title: taskName, isDone: false}}
    this.sharedTodo.tasks = {
      ...this.sharedTodo.tasks,
      ...newTask
    }
    this.alert.success('Task added')
    // this.compareStates()
  }

  isRemoteTodoDirty(): Observable<ITodo> {
    return this.sharedService.isTodoAlreadyChanged(
      this.sharedTodoOwnerId as string,
      this.sharedTodoId as string
    )
  }

  ngOnDestroy(): void {
    if (this.allSubs) {
      this.allSubs.unsubscribe()
    }
  }

  deleteTaskHandler(key: string) {
    if (Object.keys(this.sharedTodo.tasks).length === 1) {
      this.sharedTodo.tasks = {}
    } else {
      delete this.sharedTodo.tasks[key]
    }
    this.alert.success('Task delete successfully')
  }

  doNotSort = () => 0

  saveTodo() {
    if (this.auth.isAuthenticated()) {
      this.isRemoteTodoDirty()
        .subscribe((response) => {
          // this.openSaveDialog(response.tasks)
          this.remoteState = JSON.stringify(response)
          this.remoteDirty = this.initialState !== this.remoteState
          if (!this.remoteDirty) {
            return this.saveTodoChanges(this.sharedTodo)
          } else {
            return this.openSaveDialog(response.tasks)
          }
        })
    } else {
      this.router.navigate(['/']).then()
      this.alert.warning('Need authorization')
    }

  }

  saveTodoChanges(source: ITodo) {
    const newTodo: ITodo = {
      ...source,
      last_modify_date: new Date(),
      last_modify_user_id: this.sharedService.localUserId,
    }
    this.sharedService.saveChangesToDB(newTodo, this.sharedTodoId as string)
      .subscribe({
        next: () => this.alert.success('Todo save success'),
        error: () => this.alert.error('Todo save error'),
        complete: () => {
          this.initialState = JSON.stringify(this.sharedTodo)
        }
      })
  }

  undoChanges() {
    this.sharedTodo = JSON.parse(this.initialState)
  }

  compareStates() {
    this.localDirty = this.initialState !== JSON.stringify(this.sharedTodo)
    this.localPristine = !this.localDirty
  }

  completeTask(key: string) {
    this.sharedTodo.tasks[key].isDone = true
  }

  openSaveDialog(remoteTasks: Record<string, ITask>) {
    const saveDialogRef = this.dialog.open(MergeTodoComponent, {
      data: {
        remote: this.todosService.transformObjToArr(remoteTasks),
        local: this.todosService.transformObjToArr(this.sharedTodo.tasks)
      }
    })

    saveDialogRef.afterClosed().subscribe(result => {
      this.sharedTodo.tasks = this.todosService.transformArrToObj(result)
      this.saveTodoChanges(this.sharedTodo)
    });

  }

}
