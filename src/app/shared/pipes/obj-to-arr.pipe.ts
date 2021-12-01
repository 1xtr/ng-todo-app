import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'FBObjToArr'
})
export class ObjToArrPipe implements PipeTransform {

  objToArr<T>(source: Record<string, T>): T[] {
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

  transform<T>(source: Record<string, T>): any {
    return this.objToArr(source)
  }

}
