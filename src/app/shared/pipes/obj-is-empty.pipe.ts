import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'objIsEmpty'
})
export class ObjIsEmptyPipe implements PipeTransform {

  transform<T>(value: T): boolean {
    return !!(value && Object.keys(value).length);
  }

}
