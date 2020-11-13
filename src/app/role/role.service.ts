import { Injectable } from '@angular/core';
import { Role } from './role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  appRoles: string [] = ['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_USER']
  role: Role;

  constructor() { }
}
