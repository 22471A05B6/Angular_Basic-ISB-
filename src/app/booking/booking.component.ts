import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DestinationService, Destination } from '../services/destination.service';
import { BookingService } from '../services/booking.service'; // ✅ Import

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

  // ✅ Inject BOTH services
  constructor(
    private service: DestinationService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {

    this.destinations = this.service.getDestinations();

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
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

  // Step 1: Open dialog
  submitForm(form: NgForm) {

    // if (form.invalid) {
    //   form.control.markAllAsTouched();
    //   return;
    // }

    // this.showDialog = true;
    if (form.invalid) {

    // Simulated API response for validation error
    const response = {
      status: 422, // 422 Unprocessable Entity
      success: false,
      message: "Validation Failed! Please fill all required fields correctly."
    };

    console.log("API Response:", response);
    console.log("Status Code:", response.status);

    // Highlight form errors
    form.control.markAllAsTouched();

    // Show toast
    this.showToast(`❌ ${response.message} `);
    console.log("Validation Failed! Please fill all required fields correctly.");

    return;
  }

  // ✅ Open confirmation popup if form is valid
  this.showDialog = true;
  }

  // ✅ Step 2: Confirm booking (ONLY ONE METHOD NOW)
  confirmBooking(form: NgForm) {

    const bookingData = {
      ...this.booking,
      pricePerPerson: this.selectedPrice,
      totalAmount: this.totalAmount,
      bookingDate: new Date()
    };

    const response = this.bookingService.submitBooking(bookingData);
    console.log("API Response:", response);
    console.log("Status Code:", response.status);
    // ✅ Status 200
    if (response.status === 200) {
      console.log("✅ Success - Data Stored in LocalStorage");

      this.showToast(`✅ ${response.message}`);

      // Reset form properly
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
    }

    // ❌ Status 404
    else if (response.status === 404) {
      console.log("❌ Error - Booking Failed");
      this.showToast(`❌ ${response.message} (Status: ${response.status})`);
    }

    this.showDialog = false;
  }

  cancelBooking() {

  const response = {
    status: 400,
    success: false,
    message: "Booking Cancelled by User"
  };

  console.log("API Response:", response);
  console.log("Status Code:", response.status);
  console.log("⚠ Booking Cancelled");

  this.showDialog = false;

  this.showToast(`❌ ${response.message} (Status: ${response.status})`);
}

  showToast(message: string) {

    this.toastMessage = message;

    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }
}