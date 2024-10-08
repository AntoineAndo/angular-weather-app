import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './ThemeToggle.component.html',
  styleUrl: './ThemeToggle.component.scss',
})
export class ThemeToggleComponent {
  icon_name = 'light_mode';

  constructor(private themeService: ThemeService) {}

  /*
   * Toggle the theme
   * and update the icon name
   */
  toggleTheme() {
    const newTheme = this.themeService.toggleTheme();

    if (newTheme === 'dark') {
      this.icon_name = 'dark_mode';
    } else {
      this.icon_name = 'light_mode';
    }
  }
}
