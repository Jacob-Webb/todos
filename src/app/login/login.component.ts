import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { UserDataService } from '../service/data/user-data.service';
import { StorageService } from '../service/data/storage.service';
import { concatMap } from 'rxjs-compat/operator/concatMap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private token: String;
  passwordResetError: boolean;
  connectionError: boolean = false;
  passwordError: string;
  passwordSuccess: string;
  userConfirmed: boolean = false;
  user: string;

  @Input() username: string;
  invalidLogin = false

  constructor(
    private signin: SigninComponent,
    private register: RegisterComponent,
    private userService: UserDataService,
    private route: ActivatedRoute,
    private router: Router,
    private basicAuthenticationService: BasicAuthenticationService) {}

  ngOnInit(): void {
    /*
    * If already logged in, route to Home page
    */
   this.user = this.basicAuthenticationService.getAuthenticatedUser();
    if (this.user != null) {
      this.router.navigate(['home']);
    }

    /*
    * If there is a registration token passed in,
    *   send to the backend to complete confirmation
    */
   /*
    retrieve token from query params
    send token to userService.confirmConfirmationToken
   */
  this.route.queryParams.subscribe(params => {
    this.token = params['token'];

    if (this.token!= null) {

      this.userService.confirmConfirmationToken(this.token)
      .subscribe (() => this.userConfirmed = true)
    }
  })


    // this.token = this.route.snapshot.params['token'];
    // if (this.token != 'error' && this.token!= null) {

    //   this.userService.confirmConfirmationToken(this.token)
    //   .subscribe (
    //     data => {
    //     }
    //   )
    // }

    /*
    * If an error message was sent when trying to reset password,
    * set passwordResetError to true.
    */
   this.route.queryParams.subscribe(params=> {
     let error = params['error'];
     this.passwordError = error;
   })
   /* If a successful message has been sent for updating a password,
    * let the user know.
   */
   this.route.queryParams.subscribe(params=> {
     let success = params['success'];
     this.passwordSuccess = success;
   })
  }

}
