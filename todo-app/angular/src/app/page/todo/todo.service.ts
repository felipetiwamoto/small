import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  api: string = `http://localhost:3000/todo`;

  constructor(private http: HttpClient) {}

  index(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.api}`);
  }

  store(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.api}`, todo);
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.api}/${todo.id}`, todo);
  }

  done(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.api}/${todo.id}`, todo);
  }

  remove(todo: Todo): Observable<void> {
    return this.http.delete<void>(`${this.api}/${todo.id}`);
  }
}
