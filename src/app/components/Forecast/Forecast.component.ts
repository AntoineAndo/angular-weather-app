import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeToggleComponent } from '../ThemeToggle/ThemeToggle.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from '../../pipes/format-dates.pipe';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [
    MatIconModule,
    ThemeToggleComponent,
    HttpClientModule,
    CommonModule,
    FormatDatePipe,
  ],
  templateUrl: './Forecast.component.html',
  styleUrl: './Forecast.component.scss',
})
export class ForecastComponent {
  @Input() weatherData: any;

  constructor() {}

  ngOnInit() {}
}
