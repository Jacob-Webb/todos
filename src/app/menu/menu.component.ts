import { Component } from '@angular/core';
import { AUTHENTICATED_USER, BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  userName: string
  role: string;
  name: string;

  constructor(public basicAuthenticationService: BasicAuthenticationService) {
    this.userName = localStorage.getItem(AUTHENTICATED_USER);
    this.name = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
    this.role = localStorage.getItem('role');
  }

  ngOnInit(): void {}

}

