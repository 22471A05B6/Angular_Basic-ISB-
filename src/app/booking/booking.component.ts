import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DestinationService, Destination } from '../services/destination.service';
import { BookingService } from '../services/booking.service';

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
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {

    // Load destinations
    this.destinations = this.destinationService.getDestinations();

    // Set minimum date
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  // =========================
  // Update price when destination changes
  // =========================
  updatePrice() {

    const selected = this.destinations.find(
      d => d.name === this.booking.destination
    );

    this.selectedPrice = selected ? selected.price : 0;

    this.calculateTotal();
  }

  // =========================
  // Calculate total amount
  // =========================
  calculateTotal() {

    if (this.selectedPrice > 0 && this.booking.persons > 0) {
      this.totalAmount = this.selectedPrice * this.booking.persons;
    } else {
      this.totalAmount = 0;
    }
  }

  // =========================
  // Step 1: Validate & Open Dialog
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

    // Open confirmation popup
    this.showDialog = true;
  }

  // =========================
  // Step 2: Confirm Booking (POST)
  // =========================
  confirmBooking(form: NgForm) {

  const bookingData = {
    ...this.booking,
    pricePerPerson: this.selectedPrice,
    totalAmount: this.totalAmount,
    bookingDate: new Date()
  };

  this.bookingService.addBooking(bookingData)
    .subscribe({

      next: (response: any) => {

        console.log("✅ POST Success Response:", response);

        this.showToast("✅ Booking Added Successfully (Status: 201)");

        // Reset form
        form.resetForm({
          name: '',
          email: '',
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
  // Toast Message
  // =========================
  showToast(message: string) {

    this.toastMessage = message;

    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }

}