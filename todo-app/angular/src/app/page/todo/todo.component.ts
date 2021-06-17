import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  editing: Todo | undefined | null = null;
  todos: Array<Todo> = [];
  form: Todo = {
    title: '',
    completed: false,
  };

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.index();
  }

  index(): void {
    this.todoService
      .index()
      .subscribe((res) => (this.todos = res.filter((row) => !row.completed)));
    this.flush();
  }

  store(todo: Todo): void {
    this.todoService.store(todo).subscribe(() => this.index());
  }

  update(todo: Todo): void {
    this.todoService.update(todo).subscribe(() => this.index());
  }

  done(todo: Todo): void {
    this.todoService
      .done({ ...todo, completed: true })
      .subscribe(() => this.index());
  }

  remove(todo: Todo): void {
    this.todoService.remove(todo).subscribe(() => this.index());
  }

  setEditing(todo: Todo) {
    this.editing = todo;
    this.form = { ...todo };
  }

  handleFormChange($event: any, key: string): void {
    this.form = {
      ...this.form,
      [key]: $event.target.value,
    };
  }

  handleForm(): void {
    this.editing === null ? this.store(this.form) : this.update(this.form);
    this.flush();
  }

  handleSubmit($event: any): void {
    $event.preventDefault();
    if (this.form.title.trim().length <= 0) return;
    this.handleForm();
  }

  flush(): void {
    this.editing = null;
    this.form = {
      title: '',
      completed: false,
    };
  }
}
