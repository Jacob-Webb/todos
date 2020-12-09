import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'

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

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router,
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
      this.todoService.retrieveTodo(this.id, this.basicAuthenticationService.getAuthenticatedUser())
      .subscribe (
        data => {
          this.todo = data;
          this.todoForm.controls['title'].setValue(this.todo.title);
          this.todoForm.controls['description'].setValue(this.todo.description);
          this.todoForm.controls['date'].setValue(this.todo.targetDate);
          this.todoForm.controls['done'].setValue(this.todo.done);
        }
      )
    }
  }

  onSubmit() {
    this.todo.title = this.todoForm.controls['title'].value;
    this.todo.description = this.todoForm.controls['description'].value
    this.todo.targetDate = this.todoForm.controls['date'].value
    if (this.id == -1) {
      // Create Todo
      this.todo.done = false;
      this.todoService.createTodo(this.basicAuthenticationService.getAuthenticatedUser(), this.todo).subscribe(
        data => {

        }
      )
      this.router.navigate(['home']);
    } else {
      this.todo.done = this.todoForm.controls['done'].value;
      this.todoService.updateTodo(this.id, this.basicAuthenticationService.getAuthenticatedUser(), this.todo).subscribe(
        data => {
        }
      ),
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['home']);
      });
    }

  }

}
