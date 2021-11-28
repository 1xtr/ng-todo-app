import {Pipe, PipeTransform} from '@angular/core';
import {ITask, ITodo} from "../Interfaces";

@Pipe({
  name: 'objIsEmpty'
})
export class ObjIsEmptyPipe implements PipeTransform {

  transform(value: Record<string, ITodo | ITask>): boolean {
    return !!(value && Object.keys(value).length);
  }

}
