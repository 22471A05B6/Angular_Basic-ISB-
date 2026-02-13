import { Component } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  destinations = [
    'Goa',
    'Manali',
    'Jaipur',
    'Andaman',
    'Mysore'
  ];

  tours = [
    'Standard Package',
    'Premium Package',
    'Luxury Package'
  ];

  successMessage = '';

  constructor(private bookingService: BookingService) {}

  submitForm(form: any) {
    if (form.valid) {
      const response = this.bookingService.submitBooking(form.value);

      if (response.success) {
        this.successMessage = response.message;
        form.reset();
      }
    }
  }

}
