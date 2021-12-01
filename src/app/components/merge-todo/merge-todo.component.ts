import {Component, Inject, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ITask} from "../../shared/Interfaces";

@Component({
  selector: 'app-merge-todo',
  templateUrl: './merge-todo.component.html',
  styleUrls: ['./merge-todo.component.scss']
})
export class MergeTodoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Record<'local' | 'remote', ITask[]>) {
  }

  ngOnInit(): void {
    this.disableEqualsTasks()
  }

  disableEqualsTasks() {
    this.data.remote = this.data.remote.map(remoteTask => {
      let targetIdx!: number
      const target = this.data.local.find((localTask, index) => {
        targetIdx = index
        return localTask.id === remoteTask.id
      })
      if (JSON.stringify(remoteTask) === JSON.stringify(target)) {
        this.data.local[targetIdx] = {...this.data.local[targetIdx], isDisabled: true}
        return {...remoteTask, isDisabled: true}
      }
      return remoteTask
    })
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
