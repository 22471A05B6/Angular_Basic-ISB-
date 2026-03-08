import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme: 'light' | 'dark' = 'light';

  constructor() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.applyTheme(savedTheme);
    }
  }

  setTheme(theme: 'light' | 'dark') {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme(theme);
  }

  getTheme() {
    return this.currentTheme;
  }

  private applyTheme(theme: 'light' | 'dark') {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme + '-theme');
  }
}