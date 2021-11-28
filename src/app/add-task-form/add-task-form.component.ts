import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements OnInit {
  @Input() fieldName: string = 'taskName'
  @Output() submitAction: EventEmitter<string> = new EventEmitter<string>();
  createTaskForm: FormGroup = new FormGroup({})

  constructor() {
  }

  ngOnInit(): void {
    this.createTaskForm.addControl(this.fieldName as string, new FormControl(
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      )
    )
  }

  createTodo() {
    if (!this.createTaskForm.get(this.fieldName)?.invalid) {
      this.submitAction.emit(this.createTaskForm.get(this.fieldName as string)?.value)
      this.createTaskForm.reset()
    }
  }

}
