import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeToggleComponent } from '../ThemeToggle/ThemeToggle.component';
import { SearchModalComponent } from '../SearchModal/SearchModal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    ThemeToggleComponent,
    SearchModalComponent,
    CommonModule,
  ],
  templateUrl: './Header.component.html',
  styleUrl: './Header.component.scss',
})
export class HeaderComponent {
  @Input() weatherData: any;

  isSearchModalOpen: Boolean = false;

  constructor() {}

  setIsSearchModalOpen(value: Boolean) {
    this.isSearchModalOpen = value;
  }

  toggleSearchModal() {
    this.setIsSearchModalOpen(!this.isSearchModalOpen);
  }
}
