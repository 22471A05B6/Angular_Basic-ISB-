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

  /* NEW CHARTS */
  @ViewChild('revenueDestinationChart') revenueDestinationChart!: ElementRef;
  @ViewChild('monthlyRevenueChart') monthlyRevenueChart!: ElementRef;

  bookings: any[] = [];

  totalBookings = 0;
  totalRevenue = 0;

  mostBooked = '';
  leastBooked = '';

  barChartObj: any;
  pieChartObj: any;
  lineChartObj: any;
  doughnutChartObj: any;

  /* NEW CHART OBJECTS */
  revenueDestinationChartObj: any;
  monthlyRevenueChartObj: any;

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
    const monthlyRevenueMap = new Map<string, number>();

    this.totalRevenue = 0;

    this.bookings.forEach(b => {

      const destination = b.destination || "Unknown";
      const revenue = Number(b.totalAmount) || 0;

      /* BOOKING COUNT */
      bookingMap.set(
        destination,
        (bookingMap.get(destination) || 0) + 1
      );

      /* DESTINATION REVENUE */
      revenueMap.set(
        destination,
        (revenueMap.get(destination) || 0) + revenue
      );

      /* MONTHLY REVENUE */

      const date = new Date(b.date || new Date());
      const month = date.toLocaleString('default', { month: 'short' });

      monthlyRevenueMap.set(
        month,
        (monthlyRevenueMap.get(month) || 0) + revenue
      );

      this.totalRevenue += revenue;

    });

    let labels = Array.from(bookingMap.keys());
    const values = Array.from(bookingMap.values());

    labels = labels.map(name =>
      name.length > 12 ? name.substring(0, 12) + '...' : name
    );

    if (values.length === 0) return;

    const maxIndex = values.indexOf(Math.max(...values));
    const minIndex = values.indexOf(Math.min(...values));

    this.mostBooked = labels[maxIndex];
    this.leastBooked = labels[minIndex];

    this.createCharts(labels, values, revenueMap, monthlyRevenueMap);

  }

  createCharts(
    labels: string[],
    values: number[],
    revenueMap: Map<string, number>,
    monthlyRevenueMap: Map<string, number>
  ) {

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
    this.revenueDestinationChartObj?.destroy();
    this.monthlyRevenueChartObj?.destroy();

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
        responsive: true
      }
    });

    /* PIE CHART */

    this.pieChartObj = new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Confirmed', 'Pending', 'Cancelled'],
        datasets: [{
          data: [70,20,10],
          backgroundColor: ['#4CAF50','#FFC107','#F44336']
        }]
      },
      options: { responsive:true }
    });

    /* REVENUE LINE CHART */

    const revenueLabels = Array.from(revenueMap.keys());
    const revenueValues = Array.from(revenueMap.values());

    this.lineChartObj = new Chart(this.lineChart.nativeElement,{
      type:'line',
      data:{
        labels:revenueLabels,
        datasets:[{
          label:'Revenue Generated',
          data:revenueValues,
          borderColor:'#4facfe',
          backgroundColor:'rgba(79,172,254,0.2)',
          fill:true,
          tension:0.4
        }]
      },
      options:{ responsive:true }
    });

    /* DOUGHNUT */

    this.doughnutChartObj = new Chart(this.doughnutChart.nativeElement,{
      type:'doughnut',
      data:{
        labels:labels,
        datasets:[{
          data:values,
          backgroundColor:colors
        }]
      },
      options:{ responsive:true }
    });

    /* NEW: REVENUE PER DESTINATION */

    this.revenueDestinationChartObj = new Chart(
      this.revenueDestinationChart.nativeElement,{
      type:'bar',
      data:{
        labels:revenueLabels,
        datasets:[{
          label:'Revenue per Destination',
          data:revenueValues,
          backgroundColor:'#43e97b'
        }]
      },
      options:{
        responsive:true
      }
    });

    /* NEW: MONTHLY REVENUE */

    const monthLabels = Array.from(monthlyRevenueMap.keys());
    const monthValues = Array.from(monthlyRevenueMap.values());

    this.monthlyRevenueChartObj = new Chart(
      this.monthlyRevenueChart.nativeElement,{
      type:'line',
      data:{
        labels:monthLabels,
        datasets:[{
          label:'Monthly Revenue',
          data:monthValues,
          borderColor:'#ff9800',
          backgroundColor:'rgba(255,152,0,0.2)',
          fill:true
        }]
      },
      options:{ responsive:true }
    });

  }

}