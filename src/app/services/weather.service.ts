import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';

import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // Get environment variables
  private API_ENDPOINT = environment.weatherApiEndpoint;
  private API_KEY = environment.weatherApiKey;

  private locationSubject = new BehaviorSubject<any>(null);
  public location$ = this.locationSubject.asObservable();

  private weatherSubject = new BehaviorSubject<any>(null);
  public weather$ = this.weatherSubject.asObservable();

  private apiSubject = new BehaviorSubject<any>(null);
  public api$ = this.apiSubject.asObservable();

  constructor(private http: HttpClient) {
    // Get the location from local storage or get the user location
    const localLocation = this.getLocationFromLocalStorage();
    if (localLocation?.name) {
      this.locationSubject.next(localLocation);
    } else {
      this.getUserLocation();
    }

    this.location$
      .pipe(
        filter((location) => {
          return location !== null;
        })
      )
      .subscribe({
        next: (location) => {
          this.fetchWeather(location);
        },
      });

    this.api$
      .pipe(
        filter((d) => {
          return d !== null;
        }),
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe({
        next: (data) => {
          if (!data.error) {
            this.saveLocationToLocalStorage(data.location);
            this.saveLocationToRecentLocations(data.location);
          }
          this.weatherSubject.next(data);
        },
        error: (error) => {
          this.weatherSubject.error(error);
        },
      });
  }

  ngOnInit() {}

  getUserLocation(): void {
    // Get the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.locationSubject.next({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (error) => {
        this.locationSubject.next({
          error,
        });
      }
    );
  }

  fetchWeather(location: any): void {
    if (!this.API_KEY || !this.API_ENDPOINT) {
      throwError(() => new Error('API key or endpoint not defined'));
    }

    if (location.error) {
      this.apiSubject.next({
        data: null,
        error: 'User location not available',
      });
    }

    // Definition of the parameters for the API call
    const params = {
      key: this.API_KEY,
      // If the name is defined we use it, otherwise we use the coordinates
      q:
        location?.name ||
        `${location.coordinates.latitude},${location.coordinates.longitude}`,
      days: '6',
      aqi: 'yes',
      lang: 'fr',
    };
    // Build the URL with the parameters
    const url = new URL(this.API_ENDPOINT);
    url.search = new URLSearchParams(params).toString();

    // Call the API
    const https$ = this.http.get<any>(url.toString());
    https$
      .pipe(
        catchError((res) => {
          return of({
            data: null,
            error: res.error.error.message,
          });
        })
      )
      .subscribe({
        next: (data) => {
          this.apiSubject.next(data);
        },
        error: (error) => {
          this.apiSubject.next(error);
        },
      });
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

  saveLocationToRecentLocations(location: any): void {
    // Add the location to the list of recent locations
    const recentLocations = localStorage.getItem('recentLocations');

    if (recentLocations) {
      const recentArray = JSON.parse(recentLocations);

      // Remove the location if it already exists in the list
      const filteredLocations = recentArray.filter((l: any) => {
        return location.name !== l.name;
      });

      const newLocations = [location, ...filteredLocations].slice(0, 3);

      localStorage.setItem('recentLocations', JSON.stringify(newLocations));
    } else {
      localStorage.setItem('recentLocations', JSON.stringify([location]));
    }
  }

  getLocationFromLocalStorage(): any {
    const location = localStorage.getItem('location');

    if (location) {
      return JSON.parse(location);
    }

    return null;
  }

  setLocation(location: any): void {
    this.locationSubject.next(location);
  }
}
