import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../../service/basic-authentication.service';
import { User } from '../../list-users/list-users.component';
import { UserDataService } from '../../service/data/user-data.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { UserService } from '../../service/user.service';
import { SIGNIN_TOKEN } from '../../app.constants';
import { PreloginService } from 'src/app/service/prelogin.service';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordMinLength = 3;
  phone: string;
  hide=true;
  hideConfirm=true;
  submitted=false;
  isUniqueEmail=true;
  user: User;
  error: boolean = false;

  constructor(private userService: UserService,
              private userDataService: UserDataService,
              private router: Router,
              private basicAuthenticationService: BasicAuthenticationService,
              private preLoginService: PreloginService,
              fb: FormBuilder
             ) {
    this.registerForm = fb.group({
      'firstName':['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z]*'), Validators.required])],
      'lastName':['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z]*'), Validators.required])],
      'email':['', Validators.compose([Validators.email, Validators.required])],
      'phone':['', Validators.compose([])],
      'new-password':['', Validators.compose([Validators.minLength(3), Validators.required])],
      'confirm-password':['', Validators.compose([Validators.minLength(3), Validators.required])]
    },{
      // check whether our password and confirm password match
      validator: this.passwordMatchValidator
    });

   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    /*
    * create a user with controls
    * send the user via http
    */
    this.userService.user = new User(
      this.registerForm.controls['firstName'].value,
      this.registerForm.controls['lastName'].value,
      this.registerForm.controls['email'].value,
      this.registerForm.controls['new-password'].value,
      this.registerForm.controls['phone'].value
    )
    this.userDataService.isNewUser(this.userService.user).pipe(
      catchError((error)=>{
        if (error.status === 500) {
            console.log("An unexpected error occurred");
            return throwError(error.status);
        }
        // If the person exists and has been enabled,
        // isUniqueEmail is set to false to display a message
        else if (error.status === 409) {
          this.isUniqueEmail = false;
          return throwError(error.status);
        }
        this.error = true;
    })
    ).subscribe(
      //if this is null let them know that the person just needs to be enabled
      resp => {
        this.router.navigate(['confirmation'], {queryParams: {a: encodeURIComponent(btoa(this.userService.user.email))}});
      })
    // this token ensures that the receiving page was accessed as part of the registration path, and not accessed
    // from the "outside"
    this.preLoginService.receivedToken = SIGNIN_TOKEN;

  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password: string = formGroup.get('new-password').value; // get password from our password form control
    const confirmPassword: string = formGroup.get('confirm-password').value; // get password from our confirmPassword form control
    // compare if the passwords match
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      formGroup.get('confirm-password').setErrors({ NoPasswordMatch: true });
    }
  }

  getEmailError() {
    if (this.registerForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.registerForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getFirstNameError() {
    if (this.registerForm.controls['firstName'].hasError('required')) {
      return 'First name is required';
    }
    return this.registerForm.controls['firstName'].hasError('pattern') ? 'Name can only contain letters' : '';
  }

  getLastNameError() {
    if (this.registerForm.controls['lastName'].hasError('required')) {
      return 'Last name is required';
    }
    return this.registerForm.controls['lastName'].hasError('pattern') ? 'Name can only contain letters' : '';
  }
}
