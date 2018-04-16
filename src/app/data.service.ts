import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  userIdForLocation: string;


  constructor() { }


  getUserIdForLocation(): string {
      return this.userIdForLocation;
  }

  setUserIdForLocation(userId: string) {
      this.userIdForLocation = userId;
  }


}
