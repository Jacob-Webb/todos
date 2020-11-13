import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../list-users/list-users.component';
import { AUTHENTICATED_USER, BasicAuthenticationService } from '../service/basic-authentication.service';
import { UserDataService } from '../service/data/user-data.service';
import { IConfig } from 'ngx-mask'

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  user: User;
  updateUserForm: FormGroup;


  constructor(private basicAuthorizationService: BasicAuthenticationService,
              private userDataService: UserDataService,
              fb: FormBuilder) {
                this.updateUserForm = fb.group({
                  'phone':['', Validators.compose([])]
                });
              }

  ngOnInit(): void {
    this.userDataService.retrieveUserByEmail(localStorage.getItem(AUTHENTICATED_USER)).subscribe(
      response => {
        this.user = response;
        this.updateUserForm.controls['phone'].setValue(response.phone)
      })
  }

  onSubmit() {
    this.user.phone = this.updateUserForm.controls['phone'].value;
    this.userDataService.updateUser(this.user.id, this.user).subscribe()
  }

}
