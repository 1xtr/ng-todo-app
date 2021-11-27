import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'delColumns'
})
export class DelColumnsPipe implements PipeTransform {

  transform(array: Array<string>, ...targets: string[]): Array<string> {
    return array.filter(action => !targets.includes(action))
  }

}
