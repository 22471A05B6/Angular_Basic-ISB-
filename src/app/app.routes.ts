import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { AboutComponent } from './about/about.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { BookingComponent } from './booking/booking.component';
import { DestinationDetailsComponent } from './destination-details/destination-details.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'About', component: AboutComponent },   
  { path: 'dst', component: DestinationsComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'destination-details', component: DestinationDetailsComponent },
  {
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
},
];