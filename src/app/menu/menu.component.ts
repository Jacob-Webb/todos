import { Component } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { AUTHENTICATED_USER, FIRST_NAME, StorageService, USER_ROLE } from '../service/data/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  userName: string;
  role: string;
  name: string;
  email: string;

  constructor(public basicAuthenticationService: BasicAuthenticationService,
              private storageService: StorageService) {
    this.storageService.watchStorageItem(AUTHENTICATED_USER).subscribe(data => this.userName = data);
    this.storageService.watchStorageItem(FIRST_NAME).subscribe(data => this.name = data);
    this.storageService.watchStorageItem(USER_ROLE).subscribe(data => this.role = data);
  }

  ngOnInit(): void {}

}

