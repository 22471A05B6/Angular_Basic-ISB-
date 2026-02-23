import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DestinationService, Destination } from '../services/destination.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  destinations: Destination[] = [];
  submittedBookings: any[] = [];

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

  constructor(private service: DestinationService) {}

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

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.showDialog = true;
  }

  // Step 2: Confirm booking
  confirmBooking(form: NgForm) {

    const newBooking = {
      ...this.booking,
      totalAmount: this.totalAmount
    };

    this.submittedBookings.push(newBooking);

    this.showDialog = false;

    this.showToast("🎉 Booking Confirmed Successfully!");

    // Proper full reset
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

  // Cancel booking
  cancelBooking() {
    this.showDialog = false;
    this.showToast("❌ Booking Cancelled");
  }

  // Toast function
  showToast(message: string) {

    this.toastMessage = message;

    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }

}