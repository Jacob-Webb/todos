import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../list-todos/list-todos.component';
import { AUTHENTICATED_USER, StorageService } from '../service/data/storage.service';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userEmail: string;
  todos$: Observable<Todo[]>
  todosNotDone$: Observable<Todo[]>;
  todosDone$: Observable<Todo[]>;

  todoList: Todo[];

  constructor(private todoDataService: TodoDataService,
              private storageService: StorageService) { }

  ngOnInit(): void {



    this.storageService.watchStorageItem(AUTHENTICATED_USER).subscribe(data => this.userEmail = data);

    this.todos$ = this.todoDataService.retrieveAllTodos(this.userEmail);
    this.todos$.subscribe(data => {
      this.todoList = data
    });

  }


  /*
  * Home should:
  * List Todos
  */

}
