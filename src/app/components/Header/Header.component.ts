import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './Header.component.html',
  styleUrl: './Header.component.scss',
})
export class HeaderComponent {
  title = 'angular-weather';
}
