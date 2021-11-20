import {Pipe, PipeTransform} from '@angular/core';
import {FBObjData, ITask} from "../Interfaces";

@Pipe({
  name: 'taskStateCounter'
})
export class TaskDoneCounterPipe implements PipeTransform {

  transform(value: FBObjData<ITask>): string {
    const total = Object.keys(value).length

    let finished = 0

    Object.keys(value)
      .map(key => {
        if (value[key].isDone) {
          finished++
        }
      })

    const opened = total - finished

    return `Total tasks: ${total} | Opened: ${opened} | Done: ${finished}`
  }

}
