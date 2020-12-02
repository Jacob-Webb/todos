import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BASE_URL } from '../app.constants';
import { AUTHENTICATED_USER, StorageService, TOKEN } from './data/storage.service';
import { Observable } from 'rxjs';

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
          this.storageService.setStorageItem(AUTHENTICATED_USER, username);
          this.storageService.setStorageItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser() {
    this.storageService.watchStorageItem(AUTHENTICATED_USER).subscribe(user => this.authenticatedUser = user)
    return this.authenticatedUser;
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      this.storageService.watchStorageItem(TOKEN).subscribe(token => this.tokenData = token);
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
