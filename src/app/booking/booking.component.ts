import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  destinations = [
    'Udaipur',
    'Lakshadweep',
    'Kodaikanal',
    'Taj Mahal, Agra',
    'Darjeeling',
    'Jaipur',
    'Manali',
    'Varanasi',
    'Ooty',
    'Mysore Palace',
    'Charminar, Hyderabad',
    'Golden Temple, Amritsar',
    'Goa Beaches',
    'Coorg',
    'Hampi',
    'Mount Abu',
    'Rishikesh',
    'Andaman & Nicobar'
  ];

  tours = [
    'Standard Package',
    'Premium Package',
    'Luxury Package'
  ];

  successMessage = '';

  selectedDestination: string = '';
  selectedPrice: number | null = null;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  // ✅ Auto-fill from destination page
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['destination']) {
        this.selectedDestination = params['destination'];
      }

      if (params['price']) {
        this.selectedPrice = +params['price'];
      }
    });
  }

  // ✅ Submit booking
  submitForm(form: any) {

    if (form.valid) {

      const bookingData = {
        ...form.value,
        destination: this.selectedDestination || form.value.destination,
        price: this.selectedPrice
      };

      const response = this.bookingService.submitBooking(bookingData);

      if (response.success) {

        // 🎉 Popup
        alert("🎉 Booking Successful!");

        this.successMessage = response.message;

        form.reset();
        this.selectedDestination = '';
        this.selectedPrice = null;
      }
    }
  }

}
