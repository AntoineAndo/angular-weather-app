import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PlacesService } from '../../services/places.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [MatIconModule, HttpClientModule, CommonModule, ReactiveFormsModule],
  providers: [PlacesService],
  templateUrl: './SearchModal.component.html',
  styleUrl: './SearchModal.component.scss',
})
export class SearchModalComponent implements OnInit {
  @Input() weatherData: any;

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  searchResults: any[] = [];
  searchLoading: boolean = false;

  recentLocations: any[] = localStorage.getItem('recentLocations')
    ? JSON.parse(localStorage.getItem('recentLocations')!)
    : [];

  timer: any;

  inputForm: FormControl = new FormControl();

  constructor(
    private placesService: PlacesService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    // Automatically focus on the input field when the modal is opened
    document.getElementById('search-input')?.focus();

    this.inputForm.valueChanges.subscribe((value) => {
      // If the search value is empty, the search results should be cleared
      if (value == '') {
        this.searchResults = [];
      } else {
        this.onInputChange(value);
      }
    });
  }

  clearSearch() {
    this.inputForm.setValue('');
  }

  onInputChange(value: string) {
    this.searchLoading = true;
    // Debounce the place search
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      // Call the API to search for matching places
      this.placesService.searchPlaces(value).subscribe((data) => {
        this.searchResults = data;
        this.searchLoading = false;
      });
    }, 400);
  }

  selectPlace(location: any) {
    this.weatherService.setLocation({
      name: location.name,
      coordinates: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });

    this.onClose.emit();
  }

  selectCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.weatherService.setLocation({
        coordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });

      this.onClose.emit();
    });
  }
}
