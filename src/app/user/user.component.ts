import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../service/data/user-data.service';
import { User } from '../list-users/list-users.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  id: number;
  user: User;

  constructor(private userService: UserDataService,
              private route: ActivatedRoute,
              private router: Router,
              private basicAuthenticationService: BasicAuthenticationService
             ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.user = new User('', '', '', '', '')

    // id of -1 means user is new. Otherwise, retrieve existing user.
    if (this.id != -1) {
      this.userService.retrieveUserById(this.id)
      .subscribe (
        data => this.user = data
      )
    }
  }

  saveTodo() {
    if (this.id == -1) {
      // Create User
      this.userService.createUser(this.user).subscribe(
        data => {
          
        }
      )
      this.router.navigate(['user']);
    } else {
      this.userService.updateUser(this.id, this.user).subscribe(
        data => {
          
        }
      )
      this.router.navigate(['user']);
    }
  }

}

/*

*/
