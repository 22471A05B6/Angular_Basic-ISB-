import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { GignupComponent } from './gignup/gignup.component';
import { AboutComponent } from './about/about.component';
export const routes: Routes = [
    {path:'',component:HomeComponent  },
    { path: 'signin', component: SigninComponent},
    { path: 'gignup', component: GignupComponent } ,
  { path: 'About', component: AboutComponent },

];
