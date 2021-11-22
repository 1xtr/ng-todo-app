import { Injectable } from '@angular/core';
import {FBObjData, ITodoList} from "../shared/Interfaces";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  todoLists$: Subject<FBObjData<ITodoList>> = new Subject<FBObjData<ITodoList>>()
  newTodoList$: Subject<FBObjData<ITodoList>> = new Subject<FBObjData<ITodoList>>()
  isLoading$: Subject<boolean> = new Subject<boolean>()

  constructor() { }
}
