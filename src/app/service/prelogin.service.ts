import { Injectable } from '@angular/core';
import { SIGNIN_TOKEN } from '../app.constants'

@Injectable({
  providedIn: 'root'
})
export class PreloginService {
  receivedToken: string;
  confirmationToken: string;
  changePasswordToken: string;

  constructor() { }
}
