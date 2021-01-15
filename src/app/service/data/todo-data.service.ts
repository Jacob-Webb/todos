import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../list-todos/list-todos.component';
import { API_URL } from 'src/app/app.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { AUTHENTICATED_USER, StorageService, TODO_LIST } from './storage.service';
import { map } from 'rxjs/operators';


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
    this.storageService.watchStorageItem(TODO_LIST).subscribe(data => {this.todoSubject.next(JSON.parse(data))
    console.log(JSON.parse(data))});
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
    /*
      save to database
      get id from database
      set todo id
      save to storage
      return home
    */
    // var todoList = this.todoSubject.getValue();
    // todoList.push(todo);

    // this.todoSubject.next(todoList);

    var id;
    this.http.post(`${API_URL}/todos/${email}`, todo).pipe(
      map(data => {
        id = data;
        todo.id = id;
        var todoList = this.todoSubject.getValue();
        todoList.push(todo);
        this.storageService.setStorageItem(TODO_LIST, todoList);
      })
    ).subscribe();
  }

}
