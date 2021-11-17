import {Injectable} from '@angular/core';
import {ICreateListResponse, ITodoList} from "../shared/Interfaces";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    ) { }

  getAllLists() {
    return this.http.get(`${environment.FB_DB_URL}/todo-list.json`)
      .pipe(
        map(
          (response: {[key: string]: any}) => {
          return Object
            .keys(response)
            .map(
              (key): ITodoList => response[key])
        })
      )
  }

  create(tListName: string): Observable<ICreateListResponse> | undefined {
    if (!this.auth.isAuthenticated()) {
        return
    }
    const userId = localStorage.getItem('xtr-fb-user-id') as string
    const currTime: Date = new Date()
    const random = Math.random().toString(36).substr(3)
    const list: ITodoList = {
      id: random,
      create_date: currTime,
      owner_id: userId,
      title: tListName,
      last_modify: {
        user_id: userId,
        date: currTime,
      },
      share: {
        url: `http://localhost:4200/${random}`,
        readonly: true,
        writeable: false
      }
    }
    return this.http.post<ICreateListResponse>(`${environment.FB_DB_URL}/todo-list.json`, list)
  }

  patchListId(listId: string) {
    return this.http.patch<any>(`${environment.FB_DB_URL}/todo-list/${listId}.json`, {
      id: listId
    })
  }


}
