import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DestinationService, Destination } from '../services/destination.service';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  destinations: Destination[] = [];

  showDialog = false;
  showLoginDialog = false;
  toastMessage = '';

  booking = {
    name: '',
    email: '',
    phone: '',
    destination: '',
    date: '',
    persons: 1
  };

  selectedPrice = 0;
  totalAmount = 0;
  minDate = '';

  constructor(
    private destinationService: DestinationService,
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ⭐ LOAD DESTINATIONS FIRST
    this.destinations = this.destinationService.getDestinations();

    // ⭐ PREVENT PAST DATES
    const today = new Date();
    today.setHours(0,0,0,0);
    this.minDate = today.toISOString().split('T')[0];

    // ⭐ LOGIN CHECK
    if (!this.authService.isLoggedIn()) {
      this.showLoginDialog = true;
      return;
    }

    // ⭐ AUTO FILL USER
    const user = this.authService.getCurrentUser();

    if (user) {
      this.booking.name = user.name || '';
      this.booking.email = user.email || '';
    }

  }

  updatePrice() {

    const selected = this.destinations.find(
      d => d.name === this.booking.destination
    );

    this.selectedPrice = selected ? selected.price : 0;

    this.calculateTotal();
  }

  calculateTotal() {

    if (this.selectedPrice > 0 && this.booking.persons > 0) {
      this.totalAmount = this.selectedPrice * this.booking.persons;
    } else {
      this.totalAmount = 0;
    }

  }

  submitForm(form: NgForm) {

    if (form.invalid) {
      form.control.markAllAsTouched();
      this.showToast("❌ Fill all fields correctly");
      return;
    }

    this.showDialog = true;
  }

  confirmBooking(form: NgForm) {

    const user = this.authService.getCurrentUser();

    const bookingData = {
      ...this.booking,
      userEmail: user?.email,
      pricePerPerson: this.selectedPrice,
      totalAmount: this.totalAmount,
      bookingDate: new Date(),
      status: 'confirmed'
    };

    this.bookingService.addBooking(bookingData).subscribe({

      next: () => {

        this.showToast("✅ Booking Added Successfully");

        form.resetForm({
          name: this.booking.name,
          email: this.booking.email,
          phone: '',
          destination: '',
          date: '',
          persons: 1
        });

        this.selectedPrice = 0;
        this.totalAmount = 0;
      },

      error: () => {
        this.showToast("❌ Booking Failed");
      }

    });

    this.showDialog = false;
  }

  cancelBooking() {
    this.showDialog = false;
    this.showToast("❌ Booking Cancelled");
  }

  goToLogin() {
    this.router.navigate(['/signin']);
  }

  closeLoginDialog() {
    this.showLoginDialog = false;
    this.router.navigate(['/destinations']);
  }

  showToast(message: string) {

    this.toastMessage = message;

    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }

}