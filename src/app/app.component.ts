import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/Header/Header.component';
import { WeatherComponent } from './components/Weather/Weather.component';
import { WeatherService } from './services/weather.service';
import { Subscription } from 'rxjs';

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

  constructor(
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.weatherSubscription = this.weatherService.weather$.subscribe({
      next: (data) => {
        console.log('data', data);
        this.weatherData = data;
      },
      error: (error) => {
        console.error('error', error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  ngOnDestroy(): void {
    console.log('destroy');
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
}
