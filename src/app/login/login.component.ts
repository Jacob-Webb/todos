import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { UserDataService } from '../service/data/user-data.service';
import { StorageService } from '../service/data/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private token: String;
  passwordResetError: boolean;
  passwordError: string;
  passwordSuccess: string;
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
    * If already logged in, route to Welcome page
    */
   this.user = this.basicAuthenticationService.getAuthenticatedUser();
    if (this.user != null) {
      this.router.navigate(['todos']);
    }

    /*
    * If there is a token,
    *   send to the backend to complete confirmation
    */
    this.token = this.route.snapshot.params['token'];
    if (this.token != null) {
      this.userService.confirmConfirmationToken(this.token)
      .subscribe (
        data => {
          console.log(data);
        }
      )
    }

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
