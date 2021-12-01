import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import {first, Observable} from "rxjs";
import {ITodo} from '../shared/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient,
  ) {
  }

  get localUserId(): string {
    return localStorage.getItem('xtr-fb-user-id') as string
  }

  isTodoAlreadyChanged(userId: string, todoId: string): Observable<ITodo> {
    return this.http.get<ITodo>(`${environment.FB_TODOS_DB_URL}/${userId}/${todoId}.json`)
      .pipe(
        first()
      )
  }

  saveChangesToDB(todo: ITodo, todoId: string) {
    return this.http.patch(`${environment.FB_TODOS_DB_URL}/${todo.owner_id}/${todoId}.json`, todo)
      .pipe(
        first()
      )
  }

}
