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
  showLoginDialog = false;   // ⭐ Added login dialog variable
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

    // 🔐 Check login
    if (!this.authService.isLoggedIn()) {
      this.showLoginDialog = true;   // ⭐ Show dialog
      return;
    }

    // Load destinations
    this.destinations = this.destinationService.getDestinations();

    // Minimum date
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    // Auto fill logged user
    const user = this.authService.getCurrentUser();

    if (user) {
      this.booking.name = user.name || '';
      this.booking.email = user.email || '';
    }

  }

  // =========================
  // Update price
  // =========================
  updatePrice() {

    const selected = this.destinations.find(
      d => d.name === this.booking.destination
    );

    this.selectedPrice = selected ? selected.price : 0;

    this.calculateTotal();
  }

  // =========================
  // Calculate total
  // =========================
  calculateTotal() {

    if (this.selectedPrice > 0 && this.booking.persons > 0) {
      this.totalAmount = this.selectedPrice * this.booking.persons;
    } else {
      this.totalAmount = 0;
    }

  }

  // =========================
  // Submit Form
  // =========================
  submitForm(form: NgForm) {

    if (form.invalid) {

      form.control.markAllAsTouched();

      const response = {
        status: 422,
        success: false,
        message: "Validation Failed! Fill all required fields correctly."
      };

      console.log("Validation Response:", response);

      this.showToast(`❌ ${response.message} (Status: ${response.status})`);

      return;
    }

    this.showDialog = true;
  }

  // =========================
  // Confirm Booking
  // =========================
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

  this.bookingService.addBooking(bookingData)
    .subscribe({

      next: (response: any) => {

        console.log("✅ POST Success Response:", response);

        this.showToast("✅ Booking Added Successfully (Status: 201)");

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

      error: (error) => {

        console.log("❌ POST Error:", error);

        this.showToast("❌ Booking Failed (Status: 400)");
      }

    });

  this.showDialog = false;
}
  // =========================
  // Cancel Booking
  // =========================
  cancelBooking() {

    const response = {
      status: 400,
      success: false,
      message: "Booking Cancelled by User"
    };

    console.log("Cancel Response:", response);

    this.showDialog = false;

    this.showToast(`❌ ${response.message} (Status: ${response.status})`);
  }

  // =========================
  // Login Dialog Actions
  // =========================
  goToLogin() {
    this.router.navigate(['/signin']);
  }

  closeLoginDialog() {
    this.showLoginDialog = false;
    this.router.navigate(['/destinations']);
  }

  // =========================
  // Toast Message
  // =========================
  showToast(message: string) {

    this.toastMessage = message;

    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }

}