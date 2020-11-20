import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageDataService {
  userFirstName: string;
  userLastName: string;
  userRole: string;

  constructor() { }


}
