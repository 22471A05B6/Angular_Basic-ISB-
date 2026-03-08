import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements AfterViewInit {

  @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('pieChart') pieChart!: ElementRef;
  @ViewChild('lineChart') lineChart!: ElementRef;
  @ViewChild('doughnutChart') doughnutChart!: ElementRef;

  bookings: any[] = [];

  totalBookings = 0;
  totalRevenue = 0;

  mostBooked = '';
  leastBooked = '';

  barChartObj: any;
  pieChartObj: any;
  lineChartObj: any;
  doughnutChartObj: any;

  constructor(private bookingService: BookingService) {}

  ngAfterViewInit() {

    this.bookingService.getBookings().subscribe(data => {

      this.bookings = data;

      this.generateAnalytics();

    });

  }

  generateAnalytics() {

    this.totalBookings = this.bookings.length;

    const bookingMap = new Map<string, number>();
    const revenueMap = new Map<string, number>();

    this.totalRevenue = 0;

    this.bookings.forEach(b => {

      /* FIX: Prevent undefined destination */

      const destination = b.destination || "Unknown";

      const revenue = Number(b.totalAmount) || 0;

      /* COUNT BOOKINGS */

      bookingMap.set(
        destination,
        (bookingMap.get(destination) || 0) + 1
      );

      /* CALCULATE REVENUE */

      revenueMap.set(
        destination,
        (revenueMap.get(destination) || 0) + revenue
      );

      this.totalRevenue += revenue;

    });

    let labels = Array.from(bookingMap.keys());
    const values = Array.from(bookingMap.values());

    /* FIX: Shorten long destination names */

    labels = labels.map(name =>
      name.length > 12 ? name.substring(0, 12) + '...' : name
    );

    if (values.length === 0) return;

    const maxIndex = values.indexOf(Math.max(...values));
    const minIndex = values.indexOf(Math.min(...values));

    this.mostBooked = labels[maxIndex];
    this.leastBooked = labels[minIndex];

    this.createCharts(labels, values, revenueMap);

  }

  createCharts(labels: string[], values: number[], revenueMap: Map<string, number>) {

    const colors = [
      '#4facfe',
      '#43e97b',
      '#fa709a',
      '#f6d365',
      '#667eea',
      '#ff9a9e',
      '#00c9ff',
      '#92fe9d'
    ];

    /* DESTROY OLD CHARTS */

    this.barChartObj?.destroy();
    this.pieChartObj?.destroy();
    this.lineChartObj?.destroy();
    this.doughnutChartObj?.destroy();

    /* BAR CHART */

    this.barChartObj = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Bookings',
          data: values,
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1500
        },
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });

    /* PIE CHART */

    this.pieChartObj = new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Confirmed', 'Pending', 'Cancelled'],
        datasets: [{
          data: [70, 20, 10],
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
        }]
      },
      options: {
        responsive: true,
        animation: {
          animateRotate: true,
          duration: 1800
        }
      }
    });

    /* LINE CHART (REVENUE) */

    const revenueLabels = Array.from(revenueMap.keys()).map(name =>
      name.length > 12 ? name.substring(0, 12) + '...' : name
    );

    const revenueValues = Array.from(revenueMap.values());

    this.lineChartObj = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: revenueLabels,
        datasets: [{
          label: 'Revenue Generated',
          data: revenueValues,
          borderColor: '#4facfe',
          backgroundColor: 'rgba(79,172,254,0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 2000
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    /* DOUGHNUT CHART */

    this.doughnutChartObj = new Chart(this.doughnutChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        cutout: '65%',
        animation: {
          animateScale: true,
          duration: 1800
        }
      }
    });

  }

}