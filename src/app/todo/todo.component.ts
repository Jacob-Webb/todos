import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AUTHENTICATED_USER, StorageService } from '../service/data/storage.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  id:number;
  todo: Todo;
  createTodo: boolean = false;
  todoForm: FormGroup;
  userEmail: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoDataService: TodoDataService,
    private storageService: StorageService,
    private basicAuthenticationService: BasicAuthenticationService,
    fb: FormBuilder
  ) {
    this.todoForm = fb.group({
      'title': [''],
      'description': [''],
      'date': ['', Validators.compose([Validators.required])],
      'done': ['']
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', '', false, new Date())
    this.createTodo = true;

    if (this.id != -1) {
      this.createTodo = false;
      this.todo = this.todoDataService.getTodo(this.id)

      this.todoForm.controls['title'].setValue(this.todo.title);
      this.todoForm.controls['description'].setValue(this.todo.description);
      this.todoForm.controls['date'].setValue(this.todo.targetDate);
      this.todoForm.controls['done'].setValue(this.todo.done);
    }

    this.storageService.watchStorageItem(AUTHENTICATED_USER).subscribe(
      data => this.userEmail = data
    )
  }

  onSubmit() {
    this.todo.title = this.todoForm.controls['title'].value;
    this.todo.description = this.todoForm.controls['description'].value
    this.todo.targetDate = this.todoForm.controls['date'].value
    if (this.id == -1) {
      // Create Todo
      this.todo.done = false;
      this.todoDataService.createTodo(this.todo);
      this.router.navigate(['home']);
    } else {
      // Update Todo
      this.todo.done = this.todoForm.controls['done'].value;
      this.todoDataService.updateTodo(this.todo);
      this.router.navigate(['home']);
    }

  }

}
