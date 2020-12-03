import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SIGNIN_TOKEN } from 'src/app/app.constants';
import { User } from 'src/app/list-users/list-users.component';
import { Role } from 'src/app/role/role.model';
import { RoleService } from 'src/app/role/role.service';
import { FIRST_NAME, LAST_NAME, StorageService, USER_ROLE } from 'src/app/service/data/storage.service';
import { UserDataService } from 'src/app/service/data/user-data.service';
import { PreloginService } from 'src/app/service/prelogin.service';
import { BasicAuthenticationService } from '../../service/basic-authentication.service';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  email: string;
  password: "";
  hide=true;
  invalidLogin = false;
  submitted=false;

  constructor(private preLoginService: PreloginService,
              fb: FormBuilder,
              private router: Router,
              private basicAuthenticationService: BasicAuthenticationService,
              private userService: UserDataService,
              private roleService: RoleService,
              private storageService: StorageService) {
    this.signinForm = fb.group({
      'email':['', Validators.required],
      'password':['', Validators.required]
    });

    this.email = this.signinForm.controls['email'].value;
    this.password = this.signinForm.controls['password'].value;

    //ensure that the next accessed page has a matching token
    this.preLoginService.receivedToken = SIGNIN_TOKEN;
  }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.email = this.signinForm.controls['email'].value;
    this.password = this.signinForm.controls['password'].value;
    this.basicAuthenticationService.executeJWTAuthenticationService(this.email, this.password)
      .subscribe(
        data => {
          //this.router.navigate(['welcome', this.email])
          this.router.navigate(['todos']);
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
          this.submitted = true;
        }
      )
  }

}
