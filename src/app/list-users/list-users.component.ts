import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../service/data/user-data.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { Todo } from '../todo/todo.model';
import { Role } from '../role/role.model';

export class User {
  public id: number
  public firstName: string
  public lastName: string
  public email: string
  public password: string
  public phone: string
  public todos: Todo[]
  public roles: Role[]

  constructor(firstName: string, lastName: string, email: string, password: string, phone: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }

}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users: User[];
  message: string;

  constructor(private userService: UserDataService,
              private router: Router,
              private basicAuthenticationService: BasicAuthenticationService
              ) { }

  ngOnInit(): void {
    this.refreshUsers();
  }

  refreshUsers() {
    this.userService.retrieveAllUsers().subscribe(
      response => {
        console.log(response);
        this.users = response;
      }
    )
  }

  updateUser(id) {
    console.log(`update user ${id}`)
    this.router.navigate(['users', id])
  }

  deleteTodo(id) {
    console.log(`delete user ${id}`);
    this.userService.deleteUser(id).subscribe(
      response => {
        console.log(response);
        this.message = `Deleted User ${id} successful`
        this.refreshUsers();
      }
    );
  }

  createUser() {
    this.router.navigate(['users', -1]);
  }

}
