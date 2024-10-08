import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly darkThemeClass = 'dark';
  private readonly lightThemeClass = 'light';

  constructor() {
    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
      this.enableDarkTheme();
    } else {
      this.enableLightTheme();
    }
  }

  enableDarkTheme(): void {
    document.documentElement.setAttribute('data-theme', 'dark');

    localStorage.setItem('theme', 'dark');
  }

  enableLightTheme(): void {
    document.documentElement.setAttribute('data-theme', 'light');

    localStorage.setItem('theme', 'light');
  }

  isDarkThemeEnabled(): boolean {
    return (
      document.documentElement.attributes.getNamedItem('data-theme')?.value ===
      'dark'
    );
  }

  //   Return the new theme
  toggleTheme(): string {
    if (this.isDarkThemeEnabled()) {
      this.enableLightTheme();
      return 'light';
    } else {
      this.enableDarkTheme();
      return 'dark';
    }
  }
}
