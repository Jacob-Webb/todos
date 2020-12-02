import { Injectable } from '@angular/core';
import { User } from '../list-users/list-users.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;

  constructor() { }

    /* If possible, return the user's role that matches one of the apps
  * possible roles, otherwise return null
  */
 /*
  getUserRole(roles: Role[], possibleRoles: string[]): string {

    //for each role of the user, check if there is a match with the possibe
    //roles from the app.
    var userRole: string = '';
    possibleRoles.forEach(auth => {
       var found = roles.find(role => role.name.valueOf() == auth.valueOf())
       if (found != null) userRole = found.name;
    })

    return userRole;
  }
  */
}
