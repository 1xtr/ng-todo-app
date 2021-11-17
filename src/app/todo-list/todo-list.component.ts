import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {ITodoList} from "../shared/Interfaces";
import {TodoListService} from "../_services/todo-list.service";
import {Subscription} from "rxjs";

export interface PeriodicElement {
  name: string;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined
  allSubs: Subscription | undefined

  TODO_LISTS: ITodoList[] | undefined
  ELEMENT_DATA: PeriodicElement[] = [
    {name: 'Oooops',},
    {name: 'Helium',},
    {name: 'Lithium',},

  ];

  displayedColumns: string[] = ['position', 'task', 'actions'];
  dataSource = this.ELEMENT_DATA;

  constructor(
    private listService: TodoListService
  ) {
  }

  ngOnInit(): void {
    const gSub = this.listService.getAllLists()
      .subscribe({
          next: (response) => {
            console.log('Get all:', response)
          }
        }
      )
    this.allSubs?.add(gSub)
  }

  ngOnDestroy(): void {
    if (this.allSubs) {
        this.allSubs.unsubscribe()
    }
  }
}
