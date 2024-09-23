import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo} from '../app/todos/todo';
import { TodoService } from '../app/todos/todo.service';


@Injectable()
export class MockTodoService extends TodoService {
  static testTodos: Todo[] = [
    {
      status: true,
      owner: "Wompers",
      _id: 'WompID',
      body: 'This is a body',
      category: 'womps'
    },
    {
      status: true,
      owner: "Wompers",
      _id: 'WompID2',
      body: 'The Number Four',
      category: 'wimps'
    },
    {
      status: false,
      owner: "Wimpleton",
      _id: 'WompID3',
      body: 'Wordsy',
      category: 'wimps'
    },
  ];

  constructor() {
    super(null);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTodos(_filters: { status?: boolean; owner?: string; body?: string; category?: string;
  }): Observable<Todo[]> {
    return of(MockTodoService.testTodos);
  }

  getTodoById(id: string): Observable<Todo> {

    if (id === MockTodoService.testTodos[0]._id) {
      return of(MockTodoService.testTodos[0]);
    } else if (id === MockTodoService.testTodos[1]._id) {
      return of(MockTodoService.testTodos[1]);
    } else if (id === MockTodoService.testTodos[2]._id) {
      return of(MockTodoService.testTodos[2]);
    } else {
      return of(null);
    }
  }
}
