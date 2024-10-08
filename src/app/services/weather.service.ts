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
export class WeatherService {
  // Get environment variables
  private API_ENDPOINT = environment.weatherApiEndpoint;
  private API_KEY = environment.weatherApiKey;

  private locationSubject = new BehaviorSubject<any>(null);
  public location$ = this.locationSubject.asObservable();

  private weatherSubject = new BehaviorSubject<any>(null);
  public weather$ = this.weatherSubject.asObservable();

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
        filter((location) => location !== null),
        switchMap((location) => this.fetchWeather(location))
      )
      .subscribe((weatherData) => {
        this.weatherSubject.next(weatherData);
      });
  }

  ngOnInit() {}

  getUserLocation(): void {
    // Get the user's current position
    navigator.geolocation.getCurrentPosition((position) => {
      this.locationSubject.next({
        coordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    });
  }

  fetchWeather(location: any): Observable<any> {
    if (!this.API_KEY || !this.API_ENDPOINT) {
      return of({});
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
    return this.http.get<any>(url.toString()).pipe(
      tap((data) => {
        // Save location to local storage
        this.saveLocationToLocalStorage(data.location);
      }),
      catchError((error) => {
        console.error('Error fetching weather data:', error);
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
