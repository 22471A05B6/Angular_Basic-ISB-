import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div style="text-align:center; margin-top:50px;">
      <h2>Welcome {{ user?.name }}</h2>
      <p>Email: {{ user?.email }}</p>
      <button (click)="logout()">Logout</button>
    </div>
  `
})
export class DashboardComponent implements OnInit {

  user: any;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getCurrentUser();
  }

  logout() {
    this.auth.logout();
  }
}