import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // Register User
  register(user: any) {

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // check if email already exists
    const userExists = users.find((u: any) => u.email === user.email);

    if (userExists) {
      return { success: false, message: "Email already registered" };
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true };
  }

  // Login
  login(email: string, password: string) {

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }

    return false;
  }

  // Get Logged User
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  // Logout
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/signin']);
  }

  // Check login
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}