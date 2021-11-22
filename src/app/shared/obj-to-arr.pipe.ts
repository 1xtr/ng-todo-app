import {Pipe, PipeTransform} from '@angular/core';
import {FBObjData, ITodoList} from "./Interfaces";

@Pipe({
  name: 'FBObjToArr'
})
export class ObjToArrPipe implements PipeTransform {

  objToArr<T>(source: { [key: string]: T}): T[] {
    if (!Object.keys(source).length) {
        return []
    }
    return Object
      .keys(source)
      .map((key: string): T => {

        return {
          ...source[key],
          id: key
        }
      })
  }

  transform(source: FBObjData<ITodoList>): ITodoList[] {
    return this.objToArr<ITodoList>(source)
  }

}
