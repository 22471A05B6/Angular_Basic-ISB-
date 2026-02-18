import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  submitBooking(data: any) {

  console.log("Saving to LocalStorage:", data); // 👈 Add this

  const existingBookings = JSON.parse(
    localStorage.getItem('bookings') || '[]'
  );

  existingBookings.push(data);

  localStorage.setItem(
    'bookings',
    JSON.stringify(existingBookings)
  );

  console.log("Current LocalStorage:", localStorage.getItem('bookings')); // 👈 Add this

  return {
    success: true,
    message: 'Booking Successful!'
  };
}


}
