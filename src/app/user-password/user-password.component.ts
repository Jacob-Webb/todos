import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { AUTHENTICATED_USER } from '../service/data/storage.service';
import { UserDataService } from '../service/data/user-data.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  hide: boolean[] = [true, true, true];
  passwordMinLength = 3;
  passwordMatch = true;

  constructor(private basicAuthorizationService: BasicAuthenticationService,
              private userDataService: UserDataService,
              fb: FormBuilder) {
    this.passwordForm = fb.group({
      'curr-password':['', Validators.compose([Validators.minLength(3), Validators.required])],
      'new-password':['', Validators.compose([Validators.minLength(3), Validators.required])],
      'confirm-password':['', Validators.compose([Validators.minLength(3), Validators.required])]
    },{
      // check whether our password and confirm password match
      validator: this.passwordMatchValidator
    });
   }

  ngOnInit(): void {
  }

  onSubmit() {
    const newPass = this.passwordForm.controls['new-password'].value;
    const currPass = this.passwordForm.controls['curr-password'].value
    this.userDataService.confirmPassword(localStorage.getItem(AUTHENTICATED_USER), newPass, currPass).pipe(
      catchError((error)=>{
        if (error.status === 500) {
            console.log("An unexpected error occurred");
            return throwError(error.status);
        }
        // If the person exists and has been enabled,
        // isUniqueEmail is set to false to display a message
        else if (error.status === 401) {
          this.passwordMatch = false;
          return throwError(error.status);
        }
    })
    ).subscribe(
      data => {
        console.log(data)
      }
    )
    this.passwordMatch = true;
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

}
