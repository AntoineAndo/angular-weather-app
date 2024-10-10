import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/Header/Header.component';
import { WeatherComponent } from './components/Weather/Weather.component';
import { WeatherService } from './services/weather.service';
import { catchError, filter, Subscription, throwError } from 'rxjs';

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

  constructor(
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.weatherSubscription = this.weatherService.weather$
      .pipe(filter((data) => data !== null))
      .subscribe({
        next: (data) => {
          console.log('done');
          console.log(data);
          this.isLoading = false;
          this.weatherData = data;
        },
        error: (error) => {
          this.error = error;
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
}
