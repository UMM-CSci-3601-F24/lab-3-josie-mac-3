import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';
import {
  MatNavList,
  MatListSubheaderCssMatStyler,
  MatListItem,
  MatListItemAvatar,
  MatListItemTitle,
  MatListItemLine,
} from '@angular/material/list';
import { TodoCardComponent } from '../todo-card/todo-card.component';

import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatHint, MatError } from '@angular/material/form-field';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatHint,
    MatSelect,
    MatOption,
    MatRadioGroup,
    MatRadioButton,
    TodoCardComponent,
    MatNavList,
    MatListSubheaderCssMatStyler,
    MatListItem,
    RouterLink,
    MatListItemAvatar,
    MatListItemTitle,
    MatListItemLine,
    MatError],
  providers: [
    TodoService,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit, OnDestroy {
  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[]

  public todoStatus: boolean;
  public todoOwner: string;
  public todo_id: string; category
  public todoBody: string;
  public todoCategory: string;
  public viewType: 'card' | 'list' = 'card';
  public todoLimit: number;
  public sortBy: string;

  errMsg = '';

  private ngUnsubscribe = new Subject<void>;



  /**
   *
   * @param todoService
   * @param snackBar
   */
  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar,
  ) { }


  getTodosFromServer() {
    this.todoService
      .getTodos({
        category: this.todoCategory,
        status: this.todoStatus,
        sortBy: this.sortBy,
      })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: returnedTodos => {
          this.serverFilteredTodos = returnedTodos;
          this.updateFilter();
        },

        error: err => {
          if (err.error instanceof ErrorEvent) {
            this.errMsg = `Problem in the client - Error ${err.error.message}`;
          } else {
            this.errMsg = `Problem contacting the server - Error Code ${err.status}\nMessage: ${err.message}`;
          }
        }
      })
  }

  updateFilter() {
    this.filteredTodos = this.todoService.filterTodos(this.serverFilteredTodos, {
      owner: this.todoOwner,
      category: this.todoCategory,
      body: this.todoBody,
      limit: this.todoLimit,
    })
  }

  ngOnInit(): void {
    this.getTodosFromServer();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
