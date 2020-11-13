import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PreloginService } from 'src/app/service/prelogin.service';
import { UserDataService } from '../../service/data/user-data.service';

/*
* Receive a token from ResetPassword
* Call backend to check that the token is authenticated
* If the token is not authenticated for that user (error response), send to login page
* If the token is authenticated (non-error response), display change password form
*/

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  token: string;
  changePasswordForm: FormGroup;
  hide=true;
  hideConfirm=true;
  minLength: number = 3;
  password: string;

  constructor(
    private userService: UserDataService,
    private preLoginService: PreloginService,
    private route: ActivatedRoute,
    private router: Router,
    fb:FormBuilder
   ) {
      this.changePasswordForm = fb.group({
       'password': ['', Validators.compose([Validators.minLength(3), Validators.required])],
       'confirm-pass': ['', Validators.compose([Validators.minLength(3), Validators.required])]
     },
     {
             // check whether our password and confirm password match
          validator: this.passwordMatchValidator
     }),
      this.route.queryParams.subscribe(params => {
        this.token = params['token'];
      });
   }


  ngOnInit(): void {
    /* if this token is not valid, redirect to login page. */
      //confirm token
    if (this.token != null) {
      this.userService.confirmResetPasswordToken(this.token).pipe(
        catchError((error)=>{
          if (error.status === 500) {
            console.log("There was an unexpected error");
            return throwError(error.status);
          }
          // redirect to login page with error on error status 422 (Unprocessable entity)
          else if (error.status === 422) {
            this.router.navigate(['login'], { queryParams: { error: 'reset-pass' } });
          }
        }
      )).subscribe()
    }
    this.preLoginService.confirmationToken = this.token;
  }

  onSubmit() {
    //pass the token back along with the password to be saved to the backend
    this.password = this.changePasswordForm.controls['password'].value;
    this.userService.savePasswordReset(this.token, this.password).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.log("There was an unexpected error");
          return throwError(error.status);
        } else if (error.status === 422) {
          this.router.navigate(['login'], { queryParams: { error: 'reset-pass'}});
        }
      })
    ).subscribe(resp => {
      if (resp.status < 400) {
        this.router.navigate(['login'], { queryParams: { success: 'updated-pass'}});
      }
    });
  }

  getPasswordError() {
    if (this.changePasswordForm.controls['password'].hasError('required')) {
      return 'Password is required';
    }
    return this.changePasswordForm.controls['password'].hasError('minlength') ? 'Password must be at least ' + this.minLength + ' characters long' : '';
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password: string = formGroup.get('password').value; // get password from our password form control
    const confirmPassword: string = formGroup.get('confirm-pass').value; // get password from our confirmPassword form control
    // compare if the passwords match
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      formGroup.get('confirm-pass').setErrors({ NoPasswordMatch: true });
    }
  }

}
