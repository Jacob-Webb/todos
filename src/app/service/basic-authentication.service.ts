import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BASE_URL } from '../app.constants';
 // @ts-ignore
 import jwt_decode from "jwt-decode";

export const TOKEN = 'authToken'
export const AUTHENTICATED_USER = 'authenticateUser'
export const FIRSTNAME = 'firstName'
export const LASTNAME = 'lastName'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {
  tokenData:any;

  constructor(private http: HttpClient) { }

  // Pass username and password credentials to the backend
  executeJWTAuthenticationService(username, password) {
    return this.http.post<any>(
      `${BASE_URL}/authenticate`, {
        username,
        password
      }).pipe(
      map(
        data => {
          localStorage.setItem(AUTHENTICATED_USER, username);
          localStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser() {
    return localStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser())
      return localStorage.getItem(TOKEN);
  }

  isUserLoggedIn() {
    let user = localStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout() {
    localStorage.clear();
  }

}

export class AuthenticationBean{
  constructor(public message: string) {}
}
