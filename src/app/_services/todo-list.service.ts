import {Injectable} from '@angular/core';
import {FBObjData, ICreateListResponse, ITask, ITodoList} from "../shared/Interfaces";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {first, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import { StoreService } from './store.service';

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
    this.http.get<FBObjData<ITodoList>>(`${environment.FB_DB_URL}/todo-list.json`)
      .pipe(
        first()
      ).subscribe(value => {
        this.store.todoLists$.next(value)
      })
  }

  createTodoList(tList: ITodoList): Observable<ICreateListResponse> | undefined {
    if (!this.auth.isAuthenticated()) {
      return
    }
    return this.http.post<ICreateListResponse>(`${environment.FB_DB_URL}/todo-list.json`, tList)
      .pipe(
        first()
      )
  }

  patchListId(listId: string) {
    return this.http.patch<any>(`${environment.FB_DB_URL}/todo-list/${listId}.json`, {
      id: listId
    })
  }

  shareTodoList(listId: string, readonly: boolean = true, writeable: boolean = false) {
    const random = Math.random().toString(36).substr(3)
    return this.http.patch<any>(`${environment.FB_DB_URL}/todo-list/${listId}.json`, {
      share: {
        url: `${environment.APP_URL}/${random}`, readonly, writeable,
      }
    })
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
