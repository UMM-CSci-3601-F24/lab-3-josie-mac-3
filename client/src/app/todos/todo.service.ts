import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';

@Injectable({ providedIn: 'root', })
export class TodoService {
  readonly todoUrl: string = environment.apiUrl + 'todos';

  constructor(private httpClient: HttpClient) { }

  getTodos(filters?: {
    status?: boolean; owner?: string; body?: string; category?: string; sortBy?: string;
  }): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.status) {
        httpParams = httpParams.set('status', filters.status.toString());
      }
      if (filters.category) {
        httpParams = httpParams.set('category', filters.category);
      }
      if (filters.sortBy) {
        httpParams = httpParams.set('orderBy', filters.sortBy);
      }
    }

    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
  }

  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }

  filterTodos(todos: Todo[], filters: { owner?: string; category?: string; status?: boolean; body?: string; limit?: number }): Todo[] {
    let filteredTodos = todos;

    if (filters.owner !== undefined) {
      filters.owner = filters.owner.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.owner.toLowerCase().indexOf(filters.owner) !== -1);
    }

    if (filters.category !== undefined) {
      filters.category = filters.category.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
    }

    if (filters.status !== undefined) {

      filteredTodos = filteredTodos.filter(todo => todo.status === filters.status);
    }

    if (filters.body !== undefined) {
      filters.body = filters.body.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.body.toLowerCase().indexOf(filters.body) !== -1);
    }

    if (filters.limit) {
      filteredTodos = filteredTodos.slice(0, filters.limit);
    }
    return filteredTodos;
  }
}

