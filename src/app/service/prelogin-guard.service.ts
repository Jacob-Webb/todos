import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SIGNIN_TOKEN } from '../app.constants';
import { BasicAuthenticationService } from './basic-authentication.service';
import { PreloginService } from './prelogin.service';

@Injectable({
  providedIn: 'root'
})
export class PreloginGuardService implements CanActivate {

  constructor(private router: Router,
    private preLoginService: PreloginService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(this.preLoginService.receivedToken == SIGNIN_TOKEN)
        return true;

      if (this.preLoginService.confirmationToken != null)
        return true;

      if (this.preLoginService.changePasswordToken != null) 
        return true;

      this.router.navigate(['login'])
      return false;
    }
}
