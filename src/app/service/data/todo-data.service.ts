import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../list-todos/list-todos.component';
import { API_URL } from 'src/app/app.constants';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) { }

  /*******************
  * Create Todo List
  *******************/
 private todoSubject = new BehaviorSubject<Todo[]>([]);

 todos$: Observable<Todo[]> = this.todoSubject.asObservable();
 todo: Todo;

  /******************
  * Http Calls
  *******************/
 /*
 *  I think that I can move the API call to retrieve on initialization... we'll figure that out.
 */
  retrieveAllTodos(email) {
    this.http.get<Todo[]>(`${API_URL}/todos/${email}`)
    .subscribe(todos => {
                this.todoSubject.next(todos);
    });
    return this.todos$;
  }

  deleteTodo(todoId, email) {
    return this.http.delete(`${API_URL}/todos/${todoId}/${email}`)
  }

  // retrieveTodo(todoId, email) {
    getTodo(todoId) {
    this.todos$.subscribe(data => {
      this.todo = data.find(obj => {
        return obj.id=todoId;
      });
    })
    return this.todo;
  }

  updateTodo(todoId, email, todo) {
    return this.http.put(`${API_URL}/todos/${todoId}/${email}`, todo);
  }

  createTodo(email, todo) {
    return this.http.post(`${API_URL}/todos/${email}`, todo);
  }

}
