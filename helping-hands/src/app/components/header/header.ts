import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  mobileMenuOpen = signal(false);
  scrolled = signal(false);

  aboutDropdownOpen = signal(false);
  getInvolvedDropdownOpen = signal(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled.set(window.scrollY > 50);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
    this.aboutDropdownOpen.set(false);
    this.getInvolvedDropdownOpen.set(false);
  }

  toggleAboutDropdown() {
    this.aboutDropdownOpen.update(v => !v);
    this.getInvolvedDropdownOpen.set(false);
  }

  toggleGetInvolvedDropdown() {
    this.getInvolvedDropdownOpen.update(v => !v);
    this.aboutDropdownOpen.set(false);
  }
}
