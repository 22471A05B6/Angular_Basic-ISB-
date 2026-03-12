import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-analytics',
  imports:[CommonModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements AfterViewInit {

  role = '';

  @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('pieChart') pieChart!: ElementRef;
  @ViewChild('lineChart') lineChart!: ElementRef;
  @ViewChild('doughnutChart') doughnutChart!: ElementRef;

  @ViewChild('revenueDestinationChart') revenueDestinationChart!: ElementRef;
  @ViewChild('monthlyRevenueChart') monthlyRevenueChart!: ElementRef;

  bookings: any[] = [];

  totalBookings = 0;
  totalRevenue = 0;

  mostBooked = '';
  leastBooked = '';

  constructor(
  private bookingService: BookingService,
  public auth: AuthService
) {}

  ngAfterViewInit() {

    this.role = localStorage.getItem("role") || "user";

    this.bookingService.getBookings().subscribe(data => {
      this.bookings = data;
      this.generateAnalytics();
    });
  }

  isAdmin(): boolean {
    return this.role === 'admin';
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

      bookingMap.set(destination,(bookingMap.get(destination) || 0) + 1);

      revenueMap.set(destination,(revenueMap.get(destination) || 0) + revenue);

      const date = new Date(b.date || new Date());
      const month = date.toLocaleString('default', { month: 'short' });

      monthlyRevenueMap.set(month,(monthlyRevenueMap.get(month) || 0) + revenue);

      this.totalRevenue += revenue;

    });

    const labels = Array.from(bookingMap.keys());
    const values = Array.from(bookingMap.values());

    if(values.length === 0) return;

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
  ){

    const colors = [
      '#4facfe','#43e97b','#fa709a','#f6d365',
      '#667eea','#ff9a9e','#00c9ff','#92fe9d'
    ];

    new Chart(this.barChart.nativeElement,{
      type:'bar',
      data:{
        labels:labels,
        datasets:[{
          label:'Bookings',
          data:values,
          backgroundColor:colors
        }]
      },
      options:{responsive:true}
    });

    new Chart(this.pieChart.nativeElement,{
      type:'pie',
      data:{
        labels:['Confirmed','Pending','Cancelled'],
        datasets:[{
          data:[70,20,10],
          backgroundColor:['#4CAF50','#FFC107','#F44336']
        }]
      }
    });

    new Chart(this.doughnutChart.nativeElement,{
      type:'doughnut',
      data:{
        labels:labels,
        datasets:[{
          data:values,
          backgroundColor:colors
        }]
      }
    });

    if(this.isAdmin()){

      const revenueLabels = Array.from(revenueMap.keys());
      const revenueValues = Array.from(revenueMap.values());

      new Chart(this.lineChart.nativeElement,{
        type:'line',
        data:{
          labels:revenueLabels,
          datasets:[{
            label:'Revenue',
            data:revenueValues,
            borderColor:'#4facfe',
            backgroundColor:'rgba(79,172,254,0.2)',
            fill:true
          }]
        }
      });

      const monthLabels = Array.from(monthlyRevenueMap.keys());
      const monthValues = Array.from(monthlyRevenueMap.values());

      new Chart(this.monthlyRevenueChart.nativeElement,{
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
        }
      });

      new Chart(this.revenueDestinationChart.nativeElement,{
        type:'bar',
        data:{
          labels:revenueLabels,
          datasets:[{
            label:'Revenue Per Destination',
            data:revenueValues,
            backgroundColor:'#43e97b'
          }]
        }
      });
    }
  }
}