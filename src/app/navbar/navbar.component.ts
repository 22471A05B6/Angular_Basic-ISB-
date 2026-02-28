import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuOpen = false;
  profileMenuOpen = false;
  user: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUser();

    // 🔥 Update navbar automatically on route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadUser();
      });
  }

  loadUser() {
    this.user = this.auth.getCurrentUser();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleProfileMenu(event: Event) {
    event.stopPropagation();
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  goToProfile() {
    this.router.navigate(['/dashboard']);
    this.profileMenuOpen = false;
  }

  logout() {
    this.auth.logout();
    this.user = null;              // 🔥 Important
    this.profileMenuOpen = false;
    this.menuOpen = false;
    this.router.navigate(['/signin']);
  }

  // Close profile dropdown when clicking outside
  @HostListener('document:click')
  closeProfileOnOutsideClick() {
    this.profileMenuOpen = false;
  }
}