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
 userEmail: string;

  getTodoData(email) {
    this.http.get<Todo[]>(`${API_URL}/todos/${email}`)
    .subscribe(todos => {
                this.todoSubject.next(todos);
    });
    return this.todos$;
  }

  getTodoStorage() {
    this.storageService.watchStorageItem(TODO_LIST).subscribe(data => {this.todoSubject.next(JSON.parse(data))});
    return this.todos$;
  }

  deleteTodo(todoId, email) {
    return this.http.delete(`${API_URL}/todos/${todoId}/${email}`)
  }

  getTodo(todoId) {
    this.todos$.pipe(
      map(todoList => {
        this.todo = todoList.find(todo => todo.id == todoId);
      })
    ).subscribe();

    return this.todo;
  }

  updateTodo(todo) {
    /*
      get the users email 
      send updated todo to the backend
      replace todo in storage's todoList
      write over todoList in storage
    */
    this.storageService.watchStorageItem(AUTHENTICATED_USER).subscribe(email => this.userEmail = email)
    this.http.put(`${API_URL}/todos/${todo.id}/${this.userEmail}`, todo).subscribe();
    this.todos$.pipe(
      map(todoList => {
        var index = todoList.findIndex(searchTodo => searchTodo.id == todo.id);
        todoList[index] = todo;
        this.storageService.setStorageItem(TODO_LIST, todoList);
      })
    ).subscribe();
  }

  createTodo(todo): void {
    this.storageService.watchStorageItem(AUTHENTICATED_USER).subscribe(email => this.userEmail = email)
    this.http.post(`${API_URL}/todos/${this.userEmail}`, todo).pipe(
      map(data => {
        todo.id = data;
        var todoList = this.todoSubject.getValue();
        todoList.push(todo);
        this.storageService.setStorageItem(TODO_LIST, todoList);
      })
    ).subscribe();
  }

}
