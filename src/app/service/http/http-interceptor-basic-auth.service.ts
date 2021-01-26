import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';
import { of } from 'rxjs';
import { StorageService } from '../data/storage.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor{

  constructor(
    private basicAuthenticationService: BasicAuthenticationService,
    private storageService: StorageService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    let username = this.basicAuthenticationService.getAuthenticatedUser();

    if (basicAuthHeaderString && username) {
      request = request.clone({
        setHeaders : {
          Authorization : basicAuthHeaderString
        }
      })
    }
    return next.handle(request).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 0) {
            console.log(err.status);
            this.handleAuthError();
            return of(err);
          }
          throw err;
        }
      )

    )
  }
  private handleAuthError() {
    this.storageService.clearStorage();
    this.router.navigate(['login']);
    //this.router.navigate(['login'], { queryParams: { error: 'cors' } });
  }
}
