

import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class GeoLocationService {

  coordinates: any;

  constructor() { }

  public getPosition(): Observable<any> {
    return Observable.create(
      (observer:any) => {
      navigator.geolocation.watchPosition((pos: any) => {
        observer.next(pos);
      }),
      () => {
          console.log('Position is not available');
      },
      {
        enableHighAccuracy: true
      };
    });
  }
}