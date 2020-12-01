import { Injectable } from '@angular/core';
//To use Observable and Subject in our Angular application, we need to import it as following.
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

export const TOKEN = 'authToken'
export const AUTHENTICATED_USER = 'authenticateUser'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

 //Create a Subject
 private tokenSubject = new BehaviorSubject<string>(localStorage.getItem(AUTHENTICATED_USER));
 private authenicatedUserSubject = new BehaviorSubject<string>(localStorage.getItem(TOKEN));

 watchUserStorage(): Observable<string>{
   return this.authenicatedUserSubject.asObservable();
 }

 watchTokenStorage(): Observable<string> {
   return this.tokenSubject.asObservable();
 }

 setAuthenticatedUser(data: any) {
   localStorage.setItem(AUTHENTICATED_USER, data);
   this.authenicatedUserSubject.next(data);
 }

 setToken(data: any) {
   localStorage.setItem(TOKEN, data);
   this.tokenSubject.next(data);
 }

 clearStorage() {
   localStorage.clear();
   this.tokenSubject.next(localStorage.getItem(AUTHENTICATED_USER));
   this.authenicatedUserSubject.next(localStorage.getItem(TOKEN));
 }


  constructor() { }


}
