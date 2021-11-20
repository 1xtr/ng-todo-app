import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {FBObjData, ITask, ITodoList} from "../shared/Interfaces";
import {TodoListService} from "../_services/todo-list.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SnackBarService} from '../_services/snack-bar.service';
import {StoreService} from "../_services/store.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined
  allSubs: Subscription | undefined
  tLists: FBObjData<ITodoList>
  tasks: ITask[] | undefined
  createTaskForm: FormGroup = new FormGroup({
    taskName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  })
  displayedColumns: string[] = ['position', 'task', 'actions'];
  isTodoListEmpty: boolean = true;

  constructor(
    public listService: TodoListService,
    private alert: SnackBarService,
    private store: StoreService,
  ) {
    this.tLists = {}
  }

  ngOnInit(): void {
    this.listService.getAllLists()
    const tlSub = this.store.todoLists$.subscribe(tLists => {
      if (this.tLists !== tLists) {
        this.tLists = tLists
      }
    })
    const newTLSub = this.store.newTodoList$.subscribe(value => {
      this.tLists = {...this.tLists, ...value}
    })

    this.allSubs?.add(tlSub)
    this.allSubs?.add(newTLSub)
  }

  deleteListHandler(listId: string) {
    this.listService.deleteTodoList(listId).subscribe({
      next: () => {
        delete this.tLists[listId]
        this.alert.success('List deleted successfully')
      },
      error: () => this.alert.error('List deleting failed')
    })
  }

  shareListHandler(listId: string = '') {
    // TODO: share list method
    console.log('Share list ' + listId)
  }

  closeTaskHandler(listId: string = '', taskId: string = '') {
    this.listService.finishTask(listId, taskId).subscribe({
      next: () => {
        const newTaskState = this.tLists[listId].tasks
        newTaskState[taskId] = {...newTaskState[taskId], isDone: true }
        this.tLists[listId].tasks = { ...newTaskState}
      }
    })
  }

  deleteTaskHandler(listId: string = '', taskId: string = '') {
    this.listService.deleteTask(listId, taskId).subscribe({
      next: () => {
        const newTaskState = this.tLists[listId].tasks
        delete newTaskState[taskId]
        this.tLists[listId].tasks = { ...newTaskState}
        this.alert.success('Task deleted successfully')
      },
      error: () => this.alert.error('Task deleted failed')
    })
  }

  createTaskHandler(listId: string = '') {
    if (!this.createTaskForm.invalid) {
      const task: ITask = {
        title: this.createTaskForm.value?.taskName,
        isDone: false
      }
      this.listService.createTask(listId as string, task)
        .subscribe(response => {
          const newTask = { [response.name]: task}
          this.tLists[listId].tasks = { ...this.tLists[listId].tasks, ...newTask}
          this.alert.success('Task added')
          this.createTaskForm.reset()
        })
    }
  }

  ngOnDestroy(): void {
    if (this.allSubs) {
      this.allSubs.unsubscribe()
    }
  }
}
