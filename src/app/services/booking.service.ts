import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  name: string;
  email: string;
  phone: string;
  destination: string;
  date: string;
  persons: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) {}

  // ✅ Add booking
  addBooking(data: Booking): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // ✅ Get all bookings (REQUIRED for analytics graph)
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

}