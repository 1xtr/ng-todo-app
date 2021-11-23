import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  isLoading$: Subject<boolean> = new Subject<boolean>()
  referrer$: Subject<string> = new Subject<string>()

  constructor() { }
}
