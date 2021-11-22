import {Pipe, PipeTransform} from '@angular/core';
import {FBObjData, ITask} from "../Interfaces";

@Pipe({
  name: 'objIsEmpty'
})
export class ObjIsEmptyPipe implements PipeTransform {

  transform(value: FBObjData<ITask>): boolean {
    return !!(value && Object.keys(value).length);
  }

}
