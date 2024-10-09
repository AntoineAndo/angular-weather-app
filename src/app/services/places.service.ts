import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  // Get environment variables
  private API_ENDPOINT = environment.placesApiEndpoint;
  private API_KEY = environment.placesApiKey;

  private placesSubject = new BehaviorSubject<any>(null);
  public places$ = this.placesSubject.asObservable();

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  searchPlaces(name: string): Observable<any> {
    if (!this.API_KEY || !this.API_ENDPOINT) {
      return of({});
    }

    const params = new URLSearchParams({
      name: name,
      limit: '5',
    });

    // Build url
    const url = new URL(this.API_ENDPOINT);
    url.search = params.toString();

    // Call the API
    return this.http
      .get<any>(url.toString(), {
        headers: {
          'x-api-key': this.API_KEY,
        },
      })
      .pipe(
        tap((data) => {
          console.log('data', data);
        }),
        catchError((error) => {
          console.error('Error fetching places data:', error);
          return of(null);
        }),
        finalize(() => {})
      );
  }

  saveLocationToLocalStorage(location: any): void {
    localStorage.setItem(
      'location',
      JSON.stringify({
        name: location.name,
        coordinates: {
          latitude: location.lat,
          longitude: location.lon,
        },
      })
    );
  }

  getLocationFromLocalStorage(): any {
    const location = localStorage.getItem('location');

    if (location) {
      return JSON.parse(location);
    }

    return null;
  }
}
