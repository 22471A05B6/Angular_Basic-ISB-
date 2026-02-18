import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeoapifyService {

  private apiKey = '5227aad2da1f4d59ba31c3da65d6a133';

  constructor(private http: HttpClient) {}

  getPlaces(lat: number, lon: number, category: string) {
    const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lon},${lat},5000&limit=10&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
