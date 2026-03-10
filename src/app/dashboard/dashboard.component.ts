import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  editableUser: any = {};
  editMode = false;
  darkMode = false;

  today = new Date();
  calendarDays: number[] = [];

  bookings: any[] = [];

  stats = {
    destinations: 150,
    travelers: 500,
    packages: 75
  };

  destinations = [
    {
      name: 'Goa Beach',
      image: 'https://www.thebluekite.com/ckfinder/userfiles/images/15%20Fun%20Things%20To%20Do%20In%20Palolem%20Beach%2C%20South%20Goa%20-%20Trot_World.jpg',
      category: 'Beach'
    },
    {
      name: 'Manali',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQZV2iSY6QOCC3u629ibl_aoPcEV5ApowZMw&s',
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

  constructor(
    private auth: AuthService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {

    // Logged user
    this.user = this.auth.getCurrentUser();
    this.editableUser = { ...this.user };

    // Generate calendar
    this.generateCalendar();

    // Load bookings from API
    this.bookingService.getBookings().subscribe((data: any) => {

      // Show only logged user bookings
      this.bookings = data.filter(
        (b: any) => b.userEmail === this.user?.email
      );

    });

  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  generateCalendar() {

    const year = this.today.getFullYear();
    const month = this.today.getMonth();

    const lastDate = new Date(year, month + 1, 0).getDate();

    this.calendarDays = Array.from({ length: lastDate }, (_, i) => i + 1);
  }

  updateProfile(form: NgForm) {

    if (form.invalid) return;

    const response = this.auth.updateUser(this.editableUser);

    if (response.success) {
      this.user = this.auth.getCurrentUser();
      this.editMode = false;
    }
  }

}