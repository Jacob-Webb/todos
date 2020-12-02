import { Component } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { AUTHENTICATED_USER, StorageService } from '../service/data/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  userName: string;
  role: string;
  name: string;

  constructor(public basicAuthenticationService: BasicAuthenticationService,
              private storageService: StorageService) {
    this.storageService.watchStorageItem(AUTHENTICATED_USER).subscribe(data => this.userName = data)
    //this.name = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
    //this.role = localStorage.getItem('role');
  }

  ngOnInit(): void {}

}

