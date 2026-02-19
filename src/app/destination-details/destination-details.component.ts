import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destination-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.css']
})
export class DestinationDetailsComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {}

  apiKey = '5227aad2da1f4d59ba31c3da65d6a133';

  destination: any;

  nearbyHostels: any[] = [];
  nearbyAttractions: any[] = [];

  loading = false;

  ngOnInit(): void {

    this.destination = history.state.destination;

    if (this.destination) {
      this.loadNearbyPlaces(this.destination.name);
    }
  }


 goBack() {
  this.router.navigateByUrl('/dst');
}
// ✅ BOOK NOW FUNCTION
  bookNow() {
    this.router.navigate(['/booking'], {
      queryParams: {
        destination: this.destination.name,
        price: this.destination.price
      }
    });
  }


  loadNearbyPlaces(cityName: string) {

    this.loading = true;

    const geoUrl =
      `https://api.geoapify.com/v1/geocode/search?text=${cityName}&apiKey=${this.apiKey}`;

    this.http.get(geoUrl).subscribe((geoData: any) => {

      if (!geoData.features.length) {
        this.loading = false;
        return;
      }

      const lat = geoData.features[0].properties.lat;
      const lon = geoData.features[0].properties.lon;

      // HOSTELS
      const hostelUrl =
        `https://api.geoapify.com/v2/places?categories=accommodation.hostel&filter=circle:${lon},${lat},5000&limit=5&apiKey=${this.apiKey}`;

      this.http.get(hostelUrl).subscribe((hostelData: any) => {
        this.nearbyHostels = hostelData.features || [];
      });

      // ATTRACTIONS
      const attractionUrl =
        `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${lon},${lat},5000&limit=5&apiKey=${this.apiKey}`;

      this.http.get(attractionUrl).subscribe((attractionData: any) => {
        this.nearbyAttractions = attractionData.features || [];
        this.loading = false;
      });

    });
  }
}
