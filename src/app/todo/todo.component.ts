import { Component, OnInit } from '@angular/core';

export interface Todo {
  id: string
  title: string
  list_id: string
  deadline_date?: string
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
