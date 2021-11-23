import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {ITask, ITodoList} from "../shared/Interfaces";
import {TodoListService} from "../_services/todo-list.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SnackBarService} from '../_services/snack-bar.service';
import {StoreService} from "../_services/store.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined
  allSubs: Subscription | undefined
  createTListForm: FormGroup = new FormGroup({
    listName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  })
  tLists!: Record<string, ITodoList>
  tasks: ITask[] | undefined
  createTaskForm: FormGroup = new FormGroup({})
  displayedColumns: string[] = ['position', 'task', 'actions'];
  isLoading: boolean = true;
  shareActionsToggle: boolean = false;

  constructor(
    public listService: TodoListService,
    private alert: SnackBarService,
    private store: StoreService,
  ) {
  }

  ngOnInit(): void {
    this.listService.getAllLists().subscribe({
      next: (tLists) => {
        if (this.tLists !== tLists) {
          this.tLists = tLists
        }
      },
      complete: () => {
        this.store.isLoading$.next(false)
        if (this.tLists) {
          Object.keys(this.tLists).map((key) => this.addTaskNameField(key))
        }
      }
    })

    const loSub = this.store.isLoading$.subscribe(state => this.isLoading = state)
    this.allSubs?.add(loSub)
  }

  createTListHandler() {
    if (this.createTListForm.invalid) {
      return
    }
    const userId = localStorage.getItem('xtr-fb-user-id') as string
    const currTime: Date = new Date()
    const fragment = Math.random().toString(36).substr(3)
    const list: ITodoList = {
      create_date: currTime,
      owner_id: userId,
      title: this.createTListForm.value.listName,
      last_modify: {
        user_id: userId,
        date: currTime,
      },
      tasks: {},
      share: {
        fragment,
        isShared: false,
        url: `${environment.APP_URL}/t/${fragment}`,
        writeable: false,
      },
      isActive: false
    }
    this.listService.createTodoList(list).subscribe({
      next: (response) => {
        if (response.name) {
          this.addTaskNameField(response.name)
          this.tLists = {...this.tLists, [response.name]: list}
          this.alert.success('Todo list successfully created!')
          this.createTListForm.reset()
        }
      },
      error: (err) => {
        console.log('Create list error: ', err)
        this.alert.error('Create list failed')
      },
    })
  }

  deleteListHandler(listId: string, fragment: string) {
    if (this.tLists[listId].share.isShared) {
      this.listService.delete(`/shared-todo/${fragment}`)
    }
    this.listService.deleteTodoList(listId).subscribe({
      next: () => {
        if (Object.keys(this.tLists).length === 1) {
          this.tLists = {}
        } else {
          delete this.tLists[listId]
        }
        this.alert.success('List deleted successfully')
      },
      error: () => this.alert.error('List deleting failed')
    })
    this.createTListForm.removeControl(listId)
    this.createTListForm.reset()
  }

  shareListToggleHandler(isShared: boolean, listId: string = '', writable: boolean = false, fragment: string) {
    this.listService.shareTodoToggle(isShared, listId, writable, fragment)
    if (isShared) {
      this.alert.success('Todo share cancelled')
      this.tLists[listId].share['isShared'] = !isShared
    } else {
      this.alert.success('Todo share successfully')
      this.tLists[listId].share['isShared'] = !isShared
    }
    this.activeTodoToggle(listId)
  }

  createTaskHandler(listId: string = '') {
    if (!this.createTaskForm.get(listId)?.invalid) {
      const task: ITask = {
        title: this.createTaskForm.get(listId)?.value,
        isDone: false
      }
      this.listService.createTask(listId as string, task)
        .subscribe(response => {
          const newTask = {[response.name]: task}
          this.tLists[listId].tasks = {...this.tLists[listId].tasks, ...newTask}
          this.alert.success('Task added')
          this.createTaskForm.reset()
        })
    }
  }

  deleteTaskHandler(listId: string = '', taskId: string = '') {
    this.listService.deleteTask(listId, taskId).subscribe({
      next: () => {
        const newTaskState = this.tLists[listId].tasks
        delete newTaskState[taskId]
        this.tLists[listId].tasks = {...newTaskState}
        this.alert.success('Task deleted successfully')
      },
      error: () => this.alert.error('Task deleted failed')
    })
  }

  closeTaskHandler(listId: string = '', taskId: string = '') {
    this.listService.finishTask(listId, taskId).subscribe({
      next: () => {
        const newTaskState = this.tLists[listId].tasks
        newTaskState[taskId] = {...newTaskState[taskId], isDone: true}
        this.tLists[listId].tasks = {...newTaskState}
      }
    })
  }

  changeShareAccessTypeHandler(todoId: string, writeable: boolean, fragment: string) {
    console.log(todoId, writeable, fragment)
    if (
      this.listService.patch(`/todo-list/${todoId}/share`, {writeable})
      && this.listService.patch(`/shared-todo/${fragment}`, {writeable})
    ) {
      this.tLists[todoId].share['writeable'] = writeable
      this.alert.success(`Shared access now is ${writeable ? 'read and write' : 'read only'}`)
      this.activeTodoToggle(todoId)
    }
  }

  activeTodoToggle(id: string) {
    this.tLists[id].isActive = !this.tLists[id].isActive
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

  forTestFn() {
    console.log('task Name form', this.createTaskForm)
  }
}
