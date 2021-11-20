import {Pipe, PipeTransform} from '@angular/core';
import {FBObjData, ITask, ITodoList} from "./Interfaces";

// type inputDataAlias = ITask | ITodoList

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

  // objToArr<T>(source: { keyof T: T }): T[] {
  //   return Object
  //     .keys(source)
  //     .map((key: string): T => ({
  //           ...source[key],
  //           id: key
  //         }
  //       )
  //     )
  // }

  // transform(fbObj: FBObjData<ITodoList> | undefined): ITodoList[] {
  //   if (fbObj) {
  //     fbObj['tasks'] = this.objToArr<ITask>(fbObj['tasks']) as ITask[]
  //     return this.objToArr<ITodoList>(fbObj)
  //   }
  //   return []
  // }

}
