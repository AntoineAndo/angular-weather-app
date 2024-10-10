import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeToggleComponent } from '../ThemeToggle/ThemeToggle.component';
import { HttpClientModule } from '@angular/common/http';
import { ForecastComponent } from '../Forecast/Forecast.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    MatIconModule,
    ThemeToggleComponent,
    HttpClientModule,
    ForecastComponent,
    CommonModule,
  ],
  templateUrl: './Weather.component.html',
  styleUrl: './Weather.component.scss',
})
export class WeatherComponent {
  @Input() weatherData: any;
  @Input() error: string = '';
  @Input() isLoading: boolean = true;

  constructor() {}

  ngOnInit() {}
}
