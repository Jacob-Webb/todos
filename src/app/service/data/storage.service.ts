import { Injectable } from '@angular/core';
//To use Observable and Subject in our Angular application, we need to import it as following.
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

export const TOKEN = 'authToken'
export const AUTHENTICATED_USER = 'authenticateUser'
export const USER_ROLE = "role"
export const FIRST_NAME = "firstName"
export const LAST_NAME = "lastName"

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageSubjects = new Map([
    [AUTHENTICATED_USER, new BehaviorSubject<string>(localStorage.getItem(AUTHENTICATED_USER))],
    [TOKEN, new BehaviorSubject<string>(localStorage.getItem(TOKEN))],
    [USER_ROLE, new BehaviorSubject<string>(localStorage.getItem(USER_ROLE))],
    [FIRST_NAME, new BehaviorSubject<string>(localStorage.getItem(FIRST_NAME))],
    [LAST_NAME, new BehaviorSubject<string>(localStorage.getItem(LAST_NAME))]
  ]);

 watchStorageItem(key: string): Observable<string>{
   return this.storageSubjects.get(key).asObservable();
 }

 setStorageItem(key: string, data: string) {
  localStorage.setItem(key, data);
  this.storageSubjects.get(key).next(data);
}

 clearStorage() {
   localStorage.clear();
   this.storageSubjects.get(TOKEN).next(localStorage.getItem(TOKEN));
   this.storageSubjects.get(AUTHENTICATED_USER).next(localStorage.getItem(AUTHENTICATED_USER));
 }

  constructor() { }
}
