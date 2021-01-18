import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from '../list-todos/list-todos.component';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { AUTHENTICATED_USER, StorageService, TODO_LIST } from '../service/data/storage.service';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userEmail: string;
  todoList$: Observable<Todo[]>
  todosNotDone$: Observable<Todo[]>;
  todosDone$: Observable<Todo[]>;

  todoList: Todo[];

  constructor(private router: Router,
              private basicAuthenticationService: BasicAuthenticationService,
              private todoDataService: TodoDataService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.watchStorageItem(AUTHENTICATED_USER).subscribe(data => this.userEmail = data);

    this.todoList$ = this.todoDataService.getTodoStorage();
    this.todoList$.subscribe(list => {
      this.todoList = list;
    });
  }

  updateTodo(id) {
    this.router.navigate(['todo', id])
  }

  deleteTodo(id) {
    /*
      send information to backend
      get todoList from storage
      remove todo from todoList
      Update todoList in storage
    */
   //this.todoDataService.deleteTodo(id).subscribe();
   var todo = this.todoList.find(element => element.id == id)
   console.log(todo);

    // this.todoDataService.deleteTodo(id, this.basicAuthenticationService.getAuthenticatedUser()).subscribe(
    //   response => {
    //     //this.message = `Delete of Todo ${id} Succesful`
    //     //this.refreshTodos();
    //   }
    // );

  }

  createTodo(){
    this.router.navigate(['todo',-1]);
  }

}
