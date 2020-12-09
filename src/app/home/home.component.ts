import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../list-todos/list-todos.component';
import { AUTHENTICATED_USER, StorageService } from '../service/data/storage.service';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userEmail: string;

  todosNotDone$: Observable<Todo[]>;
  todosDone$: Observable<Todo[]>;

  constructor(private todoDataService: TodoDataService,
              private storageService: StorageService) { }

  ngOnInit(): void {



    this.storageService.watchStorageItem(AUTHENTICATED_USER).subscribe(data => this.userEmail = data);

    const todos$ = this.todoDataService.retrieveAllTodos(this.userEmail);
  }


  /*
  * Home should:
  * List Todos
  */

}
