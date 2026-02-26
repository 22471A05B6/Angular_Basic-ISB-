import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DestinationService, Destination } from '../services/destination.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {

  destinations: Destination[] = [];
  filteredDestinations: Destination[] = [];

  searchText: string = '';

  // Filters
  selectedType: string = 'All';
  selectedPackage: string = '';
  selectedPopularity: string = '';

  destinationTypes: string[] = [
    'Heritage',
    'Island',
    'Hill Station',
    'Historical',
    'Spiritual',
    'Beach'
  ];

  expandedIndex: number | null = null;

  constructor(
    private destinationService: DestinationService,
    private router: Router   // ✅ Added Router
  ) {}

  ngOnInit(): void {
    this.destinations = this.destinationService.getDestinations();
    this.filteredDestinations = this.destinations;
  }

  // ===============================
  // TYPE FILTER
  // ===============================
  filterByType(type: string) {
    this.selectedType = type;
    this.applyFilters();
  }

  // ===============================
  // PACKAGE FILTER
  // ===============================
  filterByPackage(pkg: string) {
    this.selectedPackage = pkg;
    this.applyFilters();
  }

  // ===============================
  // POPULARITY FILTER
  // ===============================
  filterByPopularity(pop: string) {
    this.selectedPopularity = pop;
    this.applyFilters();
  }

  // ===============================
  // APPLY ALL FILTERS
  // ===============================
  applyFilters() {
    this.filteredDestinations = this.destinations.filter(dest => {

      const typeMatch =
        this.selectedType === 'All' || dest.type === this.selectedType;

      const popularityMatch =
        !this.selectedPopularity || dest.popularity === this.selectedPopularity;

      let packageMatch = true;

      if (this.selectedPackage === 'Standard') {
        packageMatch = dest.price <= 7000;
      } 
      else if (this.selectedPackage === 'Premium') {
        packageMatch = dest.price > 7000 && dest.price <= 12000;
      } 
      else if (this.selectedPackage === 'Luxury') {
        packageMatch = dest.price > 12000;
      }

      const searchMatch =
        !this.searchText ||
        dest.name.toLowerCase().includes(this.searchText.toLowerCase());

      return typeMatch && popularityMatch && packageMatch && searchMatch;
    });
  }

  // ===============================
  // CLEAR FILTERS
  // ===============================
  clearFilters() {
    this.selectedType = 'All';
    this.selectedPackage = '';
    this.selectedPopularity = '';
    this.searchText = '';
    this.filteredDestinations = this.destinations;
  }

  // ===============================
  // CARD EXPAND
  // ===============================
  toggleCard(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  closeCard(event: Event) {
    event.stopPropagation();
    this.expandedIndex = null;
  }

  // ===============================
  // NAVIGATE TO DETAILS (WITHOUT ID)
  // ===============================
  goToDetails(destination: Destination, event: Event) {
    event.stopPropagation();

    this.router.navigate(['/destination-details'], {
      state: { destination: destination }
    });
  }

}