import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  expandedIndex: number | null = null;

  toggleCard(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}
