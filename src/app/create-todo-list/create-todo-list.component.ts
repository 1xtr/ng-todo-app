import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-todo-list',
  templateUrl: './create-todo-list.component.html',
  styleUrls: ['./create-todo-list.component.scss']
})
export class CreateTodoListComponent implements OnInit {
  value: string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
