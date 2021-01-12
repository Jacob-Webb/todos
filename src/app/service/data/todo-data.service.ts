import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../list-todos/list-todos.component';
import { API_URL } from 'src/app/app.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { AUTHENTICATED_USER, StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient,
              private storageService: StorageService) { }

 private todoSubject = new BehaviorSubject<Todo[]>([]);

 todos$: Observable<Todo[]> = this.todoSubject.asObservable();
 todo: Todo;

  /******************
  * Http Calls
  *******************/
 /*
 *  I think that I can move the API call to retrieve on initialization... we'll figure that out.
 */
  getTodoData(email) {
    this.http.get<Todo[]>(`${API_URL}/todos/${email}`)
    .subscribe(todos => {
                this.todoSubject.next(todos);
    });
    return this.todos$;
  }

  getTodoStorage() {
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

  createTodo(email, todo): void {
    //return this.http.post(`${API_URL}/todos/${email}`, todo);
    /*
    * Add the todo to the array of todos in storage
    * Update the value for the array in storage
    * Send the new array to the backend
    */
    //Right now this doesn't take into account that the id won't auto increment to what's in there.
    var todoList = this.todoSubject.getValue();
    todoList.push(todo);

    this.todoSubject.next(todoList);

    this.http.post(`${API_URL}/todos/${email}`, todo).subscribe(data=> console.log(data));
  }

}
