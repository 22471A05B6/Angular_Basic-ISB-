import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  showDialog = false;   // ✅ Dialog control

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
  successMessage = '';

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
    if (this.selectedPrice && this.booking.persons > 0) {
      this.totalAmount = this.selectedPrice * this.booking.persons;
    } else {
      this.totalAmount = 0;
    }
  }

  // ✅ First step: show dialog only
  submitForm(form: any) {

    if (form.invalid) {
      return;
    }

    this.showDialog = true;   // Open confirmation dialog
  }

  // ✅ Final confirmation
  confirmBooking() {

    const newBooking = {
      ...this.booking,
      totalAmount: this.totalAmount
    };

    this.submittedBookings.push(newBooking);

    this.successMessage = "✅ Booking Confirmed Successfully!";

    this.showDialog = false;

    // Reset form
    this.booking = {
      name: '',
      email: '',
      phone: '',
      destination: '',
      date: '',
      persons: 1
    };

    this.selectedPrice = 0;
    this.totalAmount = 0;

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

}