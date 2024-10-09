import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PlacesService } from '../../services/places.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [MatIconModule, HttpClientModule, CommonModule],
  providers: [PlacesService],
  templateUrl: './SearchModal.component.html',
  styleUrl: './SearchModal.component.scss',
})
export class SearchModalComponent implements OnInit {
  @Input() weatherData: any;

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  searchValue: string = '';
  searchResults: any[] = [];

  recentLocations: any[] = localStorage.getItem('recentLocations')
    ? JSON.parse(localStorage.getItem('recentLocations')!)
    : [];

  timer: any;

  constructor(
    private placesService: PlacesService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    // Automatically focus on the input field when the modal is opened
    document.getElementById('search-input')?.focus();
  }

  clearSearch() {
    this.searchValue = '';
  }

  onInputChange(e: any) {
    this.searchValue = e.target.value;

    // Debounce the place search
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      // Call the API to get the weather
      this.placesService.searchPlaces(this.searchValue).subscribe((data) => {
        this.searchResults = data;
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
}
