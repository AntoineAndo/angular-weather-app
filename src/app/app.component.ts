import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from './components/Header/Header.component';
import { WeatherComponent } from './components/Weather/Weather.component';
import { WeatherService } from './services/weather.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, WeatherComponent],
  providers: [WeatherService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  weatherData: any;
  private weatherSubscription?: Subscription;

  today: string = new Date().toLocaleDateString('fr-FR');

  isLoading: boolean = true;
  error: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherSubscription = this.weatherService.weather$
      .pipe(filter((data) => data !== null))
      .subscribe({
        next: (data) => {
          if (data.error) {
            this.weatherData = null;
            this.error = data.error;
            this.isLoading = false;
            return;
          }
          this.isLoading = false;
          this.weatherData = data;
          this.error = '';
        },
      });
  }

  ngOnDestroy(): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
}
