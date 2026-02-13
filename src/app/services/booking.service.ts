import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  submitBooking(data: any) {
    console.log('Booking Submitted:', data);

    // Mock API response simulation
    return {
      success: true,
      message: 'Booking Successful!'
    };
  }

}
