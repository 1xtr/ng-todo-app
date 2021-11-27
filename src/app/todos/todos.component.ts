import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {ITask, ITodo} from "../shared/Interfaces";
import {TodosService} from "../_services/todos.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SnackBarService} from '../_services/snack-bar.service';
import {StoreService} from "../_services/store.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})

export class TodosComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined
  allSubs: Subscription | undefined
  createTodoForm: FormGroup = new FormGroup({
    listName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  })
  todos!: Record<string, ITodo>
  tasks: ITask[] | undefined
  createTaskForm: FormGroup = new FormGroup({})
  displayedColumns: string[] = ['position', 'task', 'actions'];
  isLoading: boolean = true;
  shareActionsToggle: boolean = false;
  userId: string = localStorage.getItem('xtr-fb-user-id') || ''

  constructor(
    public todosService: TodosService,
    private alert: SnackBarService,
    private store: StoreService,
  ) {
  }

  ngOnInit(): void {
    this.todosService.getAllTodos().subscribe({
      next: (tLists) => {
        if (this.todos !== tLists) {
          this.todos = tLists
        }
      },
      complete: () => {
        this.store.isLoading$.next(false)
        if (this.todos) {
          Object.keys(this.todos).map((key) => this.addTaskNameField(key))
        }
      }
    })

    const loSub = this.store.isLoading$.subscribe(state => this.isLoading = state)
    this.allSubs?.add(loSub)

  }

  createTListHandler() {
    if (this.createTodoForm.invalid) {
      return
    }
    const userId = localStorage.getItem('xtr-fb-user-id') as string
    const currTime: Date = new Date()
    const list: ITodo = {
      create_date: currTime,
      owner_id: userId,
      title: this.createTodoForm.value.listName,
      last_modify_date: currTime,
      last_modify_user_id: userId,
      tasks: {},
      share_url: environment.APP_URL + '/t/',
      isShared: false,
      writeable: false,
    }

    this.todosService.createTodo(list).subscribe({
      next: ({name: todoId}) => {
        if (todoId) {
          this.addTaskNameField(todoId)
          this.todos = {...this.todos, [todoId]: list}
          this.alert.success('Todo list successfully created!')
          this.createTodoForm.reset()
        }
      },
      error: (err) => {
        console.log('Create list error: ', err)
        this.alert.error('Create list failed')
      },
    })
  }

  deleteTodoHandler(todoId: string, isShared: boolean) {
    this.todosService.deleteTodo(todoId, isShared)
      .subscribe({
        next: () => {
          if (Object.keys(this.todos).length === 1) {
            this.todos = {}
          } else {
            delete this.todos[todoId]
          }
          this.alert.success('List deleted successfully')
        },
        error: () => this.alert.error('List deleting failed')
      })
    this.createTodoForm.removeControl(todoId)
    this.createTodoForm.reset()
  }

  shareListToggleHandler(isShared: boolean, todoId: string, writable: boolean = false) {
    const sSub = this.todosService.shareTodoToggle(isShared, todoId, writable)
      .subscribe()
    if (isShared) {
      this.alert.success('Todo share cancelled')
      this.todos[todoId].isShared = !isShared
    } else {
      this.alert.success('Todo share successfully')
      this.todos[todoId].isShared = !isShared
    }
    this.activeTodoToggle(todoId)
    this.allSubs?.add(sSub)
  }

  createTaskHandler(todoId: string = '') {
    if (!this.createTaskForm.get(todoId)?.invalid) {
      const task: ITask = {
        title: this.createTaskForm.get(todoId)?.value,
        isDone: false
      }
      this.todosService.createTask(todoId as string, task)
        .subscribe(response => {
          const newTask = {[response.name]: task}
          this.todos[todoId].tasks = {...this.todos[todoId].tasks, ...newTask}
          this.alert.success('Task added')
          this.createTaskForm.reset()
        })
    }
  }

  deleteTaskHandler(todoId: string, taskId: string) {
    this.todosService.deleteTask(todoId, taskId).subscribe({
      next: () => {
        const newTaskState = this.todos[todoId].tasks
        delete newTaskState[taskId]
        this.todos[todoId].tasks = {...newTaskState}
        this.alert.success('Task deleted successfully')
      },
      error: () => this.alert.error('Task deleted failed')
    })
  }

  closeTaskHandler(todoId: string, taskId: string) {
    this.todosService.finishTask(todoId, taskId).subscribe({
      next: () => {
        const newTaskState = this.todos[todoId].tasks
        newTaskState[taskId] = {...newTaskState[taskId], isDone: true}
        this.todos[todoId].tasks = {...newTaskState}
      }
    })
  }

  changeShareAccessTypeHandler(todoId: string, writeable: boolean) {
    if (this.todosService.patchTodo(this.userId, todoId, {writeable}).subscribe()) {
      this.todos[todoId].writeable = writeable
      this.alert.success(`Shared access now is ${writeable ? 'read and write' : 'read only'}`)
      this.activeTodoToggle(todoId)
    }
  }

  activeTodoToggle(id: string) {
    this.todos[id].isActive = !this.todos[id].isActive
  }

  addTaskNameField(todoId: string): void {
    this.createTaskForm.addControl(todoId, new FormControl(
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],))
  }

  ngOnDestroy(): void {
    if (this.allSubs) {
      this.allSubs.unsubscribe()
    }
  }

  click() {
    console.log(this.todos);
  }
}
