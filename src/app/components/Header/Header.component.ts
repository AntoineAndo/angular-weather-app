import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeToggleComponent } from '../ThemeToggle/ThemeToggle.component';
import { SearchModalComponent } from '../SearchModal/SearchModal.component';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../services/screen.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    ThemeToggleComponent,
    SearchModalComponent,
    CommonModule,
  ],
  providers: [ScreenService],
  templateUrl: './Header.component.html',
  styleUrl: './Header.component.scss',
})
export class HeaderComponent {
  @Input() weatherData: any;

  isSearchModalOpen: Boolean = false;

  constructor(private screenService: ScreenService) {}

  isDesktop: Boolean = false;
  ngOnInit(): void {
    this.screenService.isDesktop$.subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
  }

  setIsSearchModalOpen(value: Boolean) {
    this.isSearchModalOpen = value;
  }

  toggleSearchModal() {
    this.setIsSearchModalOpen(!this.isSearchModalOpen);
  }
}
