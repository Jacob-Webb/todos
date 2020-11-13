import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../list-todos/list-todos.component';
import { API_URL } from 'src/app/app.constants';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) { }

  retrieveAllTodos(email) {
    return this.http.get<Todo[]>(`${API_URL}/todos/${email}`)
  }

  deleteTodo(todoId, email) {
    return this.http.delete(`${API_URL}/todos/${todoId}/${email}`)
  }

  retrieveTodo(todoId, email) {
    return this.http.get<Todo>(`${API_URL}/todos/${todoId}/${email}`);
  }

  updateTodo(todoId, email, todo) {
    return this.http.put(`${API_URL}/todos/${todoId}/${email}`, todo);
  }

  createTodo(email, todo) {
    return this.http.post(`${API_URL}/todos/${email}`, todo);
  }

}
