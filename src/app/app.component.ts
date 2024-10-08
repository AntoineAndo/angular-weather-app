import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/Header/Header.component';
import { WeatherComponent } from './components/Weather/Weather.component';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, WeatherComponent],
  providers: [WeatherService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  weatherData: any;

  today: string = new Date().toLocaleDateString('fr-FR');

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.weather$.subscribe((data) => {
      this.weatherData = data;

      console.log(this.weatherData);
    });
  }
}
