import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;

  destinations = [
    {
      name: 'Goa Beach',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      category: 'Beach'
    },
    {
      name: 'Manali',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
      category: 'Hill Station'
    },
    {
      name: 'Rishikesh',
      image: 'https://t4.ftcdn.net/jpg/03/30/92/29/360_F_330922949_rfLRvrnz4a1GLkGjQL9HVuSzLEXj99wq.jpg',
      category: 'Spiritual'
    },
    {
      name: 'Hampi',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBFjdTNzZ5N6vlpehb4NPviNnEWEU-Tz-jNg&s',
      category: 'Heritage'
    }
  ];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getCurrentUser();
  }

  logout() {
    this.auth.logout();
  }
}