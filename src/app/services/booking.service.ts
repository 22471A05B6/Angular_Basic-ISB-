import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  submitBooking(data: any) {

    // ❌ Error condition
    if (!data || !data.destination || data.totalAmount <= 0) {
      return {
        status: 404,
        success: false,
        message: 'Booking Failed! Invalid Data.'
      };
    }

    // ✅ Success case
    const existingBookings = JSON.parse(
      localStorage.getItem('bookings') || '[]'
    );

    existingBookings.push(data);

    localStorage.setItem(
      'bookings',
      JSON.stringify(existingBookings)
    );

    return {
      status: 200,
      success: true,
      message: 'Booking Successful!'
    };
  }
}