import {Injectable} from '@angular/core';
import {FBObjData, IFBPostResponse, ISharedTodo, ITask, ITodo} from "../shared/Interfaces";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {first, mergeMap, Observable, tap} from "rxjs";
import {AuthService} from "./auth.service";
import {StoreService} from './store.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private store: StoreService,
  ) {
  }

  get user_id(): string {
    return localStorage.getItem('xtr-fb-user-id') as string
  }

  getAllTodos(): Observable<Record<string, ITodo>> {
    this.store.isLoading$.next(true)
    return this.http.get<FBObjData<ITodo>>(`${environment.FB_TODOS_DB_URL}/${this.user_id}.json`)
      .pipe(
        first()
      )
  }

  // getAllListsByUserId(userId: string = ''): Observable<Record<string, ITodoList>> {
  //   // console.log('get all by user id: ', userId)
  //   this.store.isLoading$.next(true)
  //   return this.http.get<FBObjData<ITodoList>>(
  //     `${environment.FB_TODOS_DB_URL}/${this.user_id}.json?orderBy="owner_id"&equalTo="${userId}"`
  //   )
  //     .pipe(
  //       first()
  //     )
  // }

  createTodo(todo: ITodo): Observable<IFBPostResponse> {
    return this.http.post<IFBPostResponse>(
      `${environment.FB_TODOS_DB_URL}/${this.user_id}.json`,
      todo
    )
      .pipe(
        first()
      )
  }

  patchTodo(userId: string, todoId: string, body: Object): Observable<Record<string, any>> {
    return this.http.patch<Record<string, any>>(`${environment.FB_TODOS_DB_URL}/${userId}/${todoId}.json`, body)
      .pipe(
        first()
      )
  }

  patchSharedTodo(todoId: string, isShared: boolean): Observable<any> {
    if (isShared) {
      return this.http.delete(`${environment.FB_SHARED_DB_URL}/${todoId}.json`)
    }
    return this.http.patch<Record<string, any>>(
      `${environment.FB_SHARED_DB_URL}/${todoId}.json`,
      {user_id: this.user_id, todoId}
    )
  }

  delete(url: string) {
    return this.http.delete<any>(`${environment.FB_DB_URL}${url}.json`)
      .pipe(
        first()
      )
      .subscribe()
  }

  shareTodoToggle(isShared: boolean, todoId: string, writeable: boolean = false): Observable<Record<string, any>> {
    return this.patchTodo(this.user_id, todoId, {writeable, isShared: !isShared})
      .pipe(
        mergeMap(() => this.patchSharedTodo(todoId, isShared))
      )
  }

  deleteTodo(todoId: string, isShared: boolean = false) {
    return this.http.delete<any>(`${environment.FB_TODOS_DB_URL}/${this.user_id}/${todoId}.json`)
      .pipe(
        tap(() => !isShared || this.deleteSharedTodo(todoId).subscribe())
      )
  }

  deleteSharedTodo(todoId: string) {
    return this.http.delete<any>(`${environment.FB_SHARED_DB_URL}/${todoId}.json`)
      .pipe(
        first()
      )
  }

  createTask(todoId: string, task: ITask) {
    return this.http.post<any>(
      `${environment.FB_TODOS_DB_URL}/${this.user_id}/${todoId}/tasks.json`, task)
      .pipe(
        first()
      )
  }

  finishTask(todoId: string, taskId: string) {
    return this.http.patch<any>(
      `${environment.FB_TODOS_DB_URL}/${this.user_id}/${todoId}/tasks/${taskId}.json`, {isDone: true})
      .pipe(
        first()
      )
  }

  deleteTask(todoId: string, taskId: string) {
    return this.http.delete<any>(`${environment.FB_TODOS_DB_URL}/${this.user_id}/${todoId}/tasks/${taskId}.json`)
      .pipe(
        first()
      )
  }

  getSharedTodoOwnerId(todoId: string): Observable<Record<string, ISharedTodo>> {
    // return this.http.get<ISharedTodo>(`${environment.FB_SHARED_DB_URL}/${todoId}.json`)
    return this.http.get<Record<string, ISharedTodo>>(`${environment.FB_SHARED_DB_URL}.json?orderBy="$key"&equalTo="${todoId}"`)
  }

  getSharedTodoByOwnerId(todo_id: string, userId: string): Observable<ITodo> {
    return this.http.get<ITodo>(`${environment.FB_TODOS_DB_URL}/${userId}/${todo_id}.json`)
  }

  logAccess(todoId: string, user_id: string) {
    this.patchTodo(user_id, todoId, {data: new Date(), user_id})

  }

  getAllShared(): Observable<ISharedTodo> {
    return this.http.get<ISharedTodo>(`${environment.FB_SHARED_DB_URL}.json`)
  }


}
