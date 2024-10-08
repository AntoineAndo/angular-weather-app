import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeToggleComponent } from '../ThemeToggle/ThemeToggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, ThemeToggleComponent],
  templateUrl: './Header.component.html',
  styleUrl: './Header.component.scss',
})
export class HeaderComponent {
  @Input() weatherData: any;

  title = 'angular-weather';
}
