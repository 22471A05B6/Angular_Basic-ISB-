import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {

  constructor(private http: HttpClient) {}

  // 🔑 Replace with your Geoapify API key
  apiKey = '5227aad2da1f4d59ba31c3da65d6a133';

  // ALL DESTINATIONS
 destinations = [

{
  name: 'Udaipur',
  description: 'City of Lakes with royal charm.',
  type: 'Heritage',
  popularity: 'Medium',
  price: 8500,
  image: 'https://www.andbeyond.com/wp-content/uploads/sites/5/udaipur.jpg'
},
{
  name: 'Lakshadweep',
  description: 'Crystal clear waters and untouched beaches.',
  type: 'Island',
  popularity: 'Low',
  price: 18000,
  image: 'https://seasontours.org/wp-content/uploads/2024/04/4-29.webp'
},
{
  name: 'Kodaikanal',
  description: 'Peaceful hill station with scenic valleys.',
  type: 'Hill Station',
  popularity: 'Medium',
  price: 7500,
  image: 'https://c.ndtvimg.com/2025-08/nlp3l9fc_travel_625x300_16_August_25.jpg?im=FeatureCrop,algorithm=dnn,width=545,height=307'
},
{
  name: 'Taj Mahal, Agra',
  description: 'Symbol of love and Mughal architecture.',
  type: 'Historical',
  popularity: 'High',
  price: 6000,
  image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg'
},
{
  name: 'Darjeeling',
  description: 'Famous for tea gardens and Himalayan views.',
  type: 'Hill Station',
  popularity: 'Medium',
  price: 9000,
  image: 'https://img.freepik.com/free-photo/asian-woman-wearing-chinese-traditional-dress-ban-rak-thai-village-mae-hong-son-province-thailand_335224-1169.jpg?semt=ais_hybrid&w=740&q=80'
},
{
  name: 'Jaipur',
  description: 'The Pink City known for forts and royal palaces.',
  type: 'Heritage',
  popularity: 'High',
  price: 9500,
  image: 'https://s7ap1.scene7.com/is/image/incredibleindia/hawa-mahal-jaipur-rajasthan-city-1-hero?qlt=82&ts=1742200253577'
},
{
  name: 'Manali',
  description: 'Snowy mountains and adventure sports hub.',
  type: 'Hill Station',
  popularity: 'High',
  price: 11000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQZV2iSY6QOCC3u629ibl_aoPcEV5ApowZMw&s'
},
{
  name: 'Varanasi',
  description: 'One of the oldest living cities with spiritual heritage.',
  type: 'Spiritual',
  popularity: 'High',
  price: 7000,
  image: 'https://s7ap1.scene7.com/is/image/incredibleindia/manikarnika-ghat-city-hero?qlt=82&ts=1727959374496'
},
{
  name: 'Ooty',
  description: 'Queen of hill stations with tea plantations and pleasant climate.',
  type: 'Hill Station',
  popularity: 'High',
  price: 8500,
  image: 'https://hblimg.mmtcdn.com/content/hubble/img/destimg/mmt/destination/m_Ooty_main_tv_destination_img_1_l_764_1269.jpg'
},
{
  name: 'Mysore Palace',
  description: 'Historic palace showcasing royal architecture and cultural heritage.',
  type: 'Heritage',
  popularity: 'High',
  price: 6500,
  image: 'https://media.istockphoto.com/id/172124032/photo/mysore-palace-at-dusk.jpg?s=612x612&w=0&k=20&c=paO74C_dVsY14IbK0RNqs0TD-lSteQy-AW5CnQFEb_4='
},
{
  name: 'Charminar, Hyderabad',
  description: 'Iconic monument representing the rich history of Hyderabad.',
  type: 'Historical',
  popularity: 'High',
  price: 6000,
  image: 'https://media.istockphoto.com/id/1215274990/photo/high-wide-angle-view-of-charminar-in-the-night.jpg?s=612x612&w=0&k=20&c=byyIjqgbslf-L191n6SJu0s35fvNoVeWsxV5rIPK7Sk='
},
{
  name: 'Golden Temple, Amritsar',
  description: 'Sacred Sikh shrine known for peace and spirituality.',
  type: 'Spiritual',
  popularity: 'High',
  price: 7500,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxF3vupqic9XjaGkZTVE_a5S8aFhnc1ilWvg&s'
},
{
  name: 'Goa Beaches',
  description: 'Famous for beaches, nightlife and water sports.',
  type: 'Beach',
  popularity: 'High',
  price: 12000,
  image: 'https://www.thebluekite.com/ckfinder/userfiles/images/15%20Fun%20Things%20To%20Do%20In%20Palolem%20Beach%2C%20South%20Goa%20-%20Trot_World.jpg'
},
{
  name: 'Coorg',
  description: 'Coffee plantations and misty hills.',
  type: 'Hill Station',
  popularity: 'Medium',
  price: 8000,
  image: 'https://c.ndtvimg.com/2025-05/hrgf60uo_coorg_625x300_17_May_25.jpg?im=FaceCrop,algorithm=dnn,width=545,height=307'
},
{
  name: 'Hampi',
  description: 'Ancient ruins and UNESCO heritage site.',
  type: 'Heritage',
  popularity: 'Medium',
  price: 7000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBFjdTNzZ5N6vlpehb4NPviNnEWEU-Tz-jNg&s'
},
{
  name: 'Mount Abu',
  description: 'Only hill station in Rajasthan.',
  type: 'Hill Station',
  popularity: 'Low',
  price: 6500,
  image: 'https://hblimg.mmtcdn.com/content/hubble/img/desttvimg/mmt/destination/m_Mount_Abu_tv_destination_img_1_l_709_1065.jpg'
},
{
  name: 'Rishikesh',
  description: 'Yoga capital of the world and adventure hub.',
  type: 'Spiritual',
  popularity: 'High',
  price: 9000,
  image: 'https://t4.ftcdn.net/jpg/03/30/92/29/360_F_330922949_rfLRvrnz4a1GLkGjQL9HVuSzLEXj99wq.jpg'
},
{
  name: 'Andaman & Nicobar',
  description: 'Tropical paradise with coral reefs.',
  type: 'Island',
  popularity: 'Medium',
  price: 20000,
  image: 'https://www.gokitetours.com/wp-content/uploads/2025/01/10-Best-Places-to-Visit-in-Andaman-and-Nicobar-in-2025-1200x720.webp'
}

];


  filteredDestinations = [...this.destinations];

  destinationTypes: string[] = [];

  selectedType: string = 'All';
  selectedPopularity: string | null = null;
  selectedPackage: string | null = null;

  expandedIndex: number | null = null;

  // 🌍 Dynamic places from Geoapify
  places: any[] = [];
  loadingPlaces = false;

  // =============================
  // INIT
  // =============================

  ngOnInit(): void {
    this.destinationTypes = [
      ...new Set(this.destinations.map(d => d.type))
    ];
  }

  // =============================
  // FILTER FUNCTIONS
  // =============================

  filterByType(type: string) {
    this.selectedType = type;
    this.applyFilters();
  }

  filterByPopularity(level: string) {
    this.selectedPopularity = level;
    this.applyFilters();
  }

  filterByPackage(pkg: string) {
    this.selectedPackage = pkg;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredDestinations = this.destinations.filter(d => {

      const typeMatch =
        this.selectedType === 'All' || d.type === this.selectedType;

      const popularityMatch =
        !this.selectedPopularity ||
        d.popularity === this.selectedPopularity;

      const packageMatch =
        !this.selectedPackage ||
        (this.selectedPackage === 'Standard' && d.price >= 5000 && d.price <= 8000) ||
        (this.selectedPackage === 'Premium' && d.price > 8000 && d.price <= 15000) ||
        (this.selectedPackage === 'Luxury' && d.price > 15000);

      return typeMatch && popularityMatch && packageMatch;
    });
  }

  clearFilters() {
    this.selectedType = 'All';
    this.selectedPopularity = null;
    this.selectedPackage = null;
    this.filteredDestinations = [...this.destinations];
  }

  // =============================
  // CARD EXPANSION
  // =============================

  toggleCard(index: number) {

    this.expandedIndex =
      this.expandedIndex === index ? null : index;

    this.places = [];

    if (this.expandedIndex !== null) {
      const selected =
        this.filteredDestinations[this.expandedIndex];

      this.loadPlaces(selected.name);
    }
  }

  closeCard(event: Event) {
    event.stopPropagation();
    this.expandedIndex = null;
  }

  // =============================
  // GEOAPIFY INTEGRATION
  // =============================

  loadPlaces(cityName: string) {

    this.loadingPlaces = true;

    // STEP 1: Get latitude & longitude from city name
    const geoUrl =
      `https://api.geoapify.com/v1/geocode/search?text=${cityName}&apiKey=${this.apiKey}`;

    this.http.get(geoUrl).subscribe((geoData: any) => {

      if (!geoData.features || geoData.features.length === 0) {
        this.loadingPlaces = false;
        return;
      }

      const lat = geoData.features[0].properties.lat;
      const lon = geoData.features[0].properties.lon;

      // STEP 2: Fetch nearby tourist attractions
      const placesUrl =
        `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${lon},${lat},5000&limit=5&apiKey=${this.apiKey}`;

      this.http.get(placesUrl).subscribe((data: any) => {
        this.places = data.features || [];
        this.loadingPlaces = false;
      });

    }, error => {
      console.error('Geoapify error:', error);
      this.loadingPlaces = false;
    });

  }

}