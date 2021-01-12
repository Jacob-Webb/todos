import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { UserService } from '../service/user.service';
import { UserDataService } from '../service/data/user-data.service';
import { AUTHENTICATED_USER, StorageService} from '../service/data/storage.service';
import { RoleService } from '../role/role.service';

export class Todo {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[];
  message: string;
  userEmail: string;

  constructor(
    private todoService: TodoDataService,
    private router: Router,
    private basicAuthenticationService: BasicAuthenticationService,
    private userDataService: UserDataService,
    private userService: UserService,
    private storageService: StorageService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.refreshTodos();
    this.storageService.watchStorageItem(AUTHENTICATED_USER).subscribe(data => this.userEmail = data);
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos(this.basicAuthenticationService.getAuthenticatedUser()).subscribe(
      response => {
        this.todos = response;
      }
    )
  }

  updateTodo(id) {
    this.router.navigate(['todos', id])

  }

  deleteTodo(id) {
    this.todoService.deleteTodo(id, this.basicAuthenticationService.getAuthenticatedUser()).subscribe(
      response => {
        this.message = `Delete of Todo ${id} Succesful`
        this.refreshTodos();
      }
    );

  }

  createTodo(){
    this.router.navigate(['todos',-1]);
  }

}
