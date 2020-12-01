import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BASE_URL } from '../app.constants';
import { StorageService } from './data/storage.service';
import { Observable } from 'rxjs';

export const FIRSTNAME = 'firstName'
export const LASTNAME = 'lastName'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {
  tokenData:any = null;
  authenticatedUser: string = null;
  constructor(private http: HttpClient,
              private storageService: StorageService
              ) { }

  // Pass username and password credentials to the backend
  executeJWTAuthenticationService(username, password) {
    return this.http.post<any>(
      `${BASE_URL}/authenticate`, {
        username,
        password
      }).pipe(
      map(
        data => {
          this.storageService.setAuthenticatedUser(username);
          this.storageService.setToken(`Bearer ${data.token}`);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser() {
    this.storageService.watchUserStorage().subscribe(user => this.authenticatedUser = user)
    return this.authenticatedUser;
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      this.storageService.watchTokenStorage().subscribe(token => this.tokenData = token);
      return this.tokenData;
    }
  }

  isUserLoggedIn() {
    return !(this.authenticatedUser === null)
  }

  logout() {
    this.storageService.clearStorage();
  }

}
