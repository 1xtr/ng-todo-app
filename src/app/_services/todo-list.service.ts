import {Injectable} from '@angular/core';
import {FBObjData, IFBPostResponse, ITask, ITodoList} from "../shared/Interfaces";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {delay, first, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {StoreService} from './store.service';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private store: StoreService,
  ) {
  }

  getAllLists(): void {
    this.store.isLoading$.next(true)
    this.http.get<FBObjData<ITodoList>>(`${environment.FB_DB_URL}/todo-list.json`)
      .pipe(
        delay(1000),
        first()
      ).subscribe(value => {
      this.store.todoLists$.next(value)
    })
  }

  createTodoList(tList: ITodoList): Observable<IFBPostResponse> | undefined {
    if (!this.auth.isAuthenticated()) {
      return
    }
    return this.http.post<IFBPostResponse>(`${environment.FB_DB_URL}/todo-list.json`, tList)
      .pipe(
        first()
      )
  }

  patch(url: string, body: Object) {
    return this.http.patch<any>(`${environment.FB_DB_URL}${url}.json`, body)
      .pipe(
        first()
      )
      .subscribe({
        next: () => true,
        error: () => false
      })
  }

  delete(url: string) {
    return this.http.delete<any>(`${environment.FB_DB_URL}${url}.json`)
      .pipe(
        first()
      )
      .subscribe()
  }

  shareTodoToggle(isShared: boolean, todoId: string, writeable: boolean = false, fragment: string): void {
    if (isShared) {
      this.patch(`/todo-list/${todoId}/share`, {writeable, isShared: !isShared})
      this.delete(`/shared-todo/${fragment}`)
    } else {
      this.patch(`/todo-list/${todoId}/share`, {writeable, isShared: true})
      this.patch(`/shared-todo/${fragment}`, {todoId, writeable})
    }
  }


  deleteTodoList(listId: string | undefined) {
    return this.http.delete<any>(`${environment.FB_DB_URL}/todo-list/${listId}.json`)
      .pipe(
        first()
      )
  }

  createTask(listId: string, task: ITask) {
    return this.http.post<any>(
      `${environment.FB_DB_URL}/todo-list/${listId}/tasks.json`, task)
      .pipe(
        first()
      )
  }

  finishTask(listId: string | undefined, taskId: string | undefined) {
    return this.http.patch<any>(
      `${environment.FB_DB_URL}/todo-list/${listId}/tasks/${taskId}.json`, {isDone: true})
      .pipe(
        first()
      )
  }

  deleteTask(listId: string | undefined, taskId: string | undefined) {
    return this.http.delete<any>(`${environment.FB_DB_URL}/todo-list/${listId}/tasks/${taskId}.json`)
      .pipe(
        first()
      )
  }


}
