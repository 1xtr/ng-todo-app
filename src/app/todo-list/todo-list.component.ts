import {Component, OnInit} from '@angular/core';

export interface TodoList {
  id: string
  title: string
  owner_id: string
  create_date: string
  last_modify?: { user_id: string, date: string }
  share?: {
    url: string,
    access_type: string
  }[]
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
