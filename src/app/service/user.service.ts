import { Injectable } from '@angular/core';
import { User } from '../list-users/list-users.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;

  constructor() { }
}
