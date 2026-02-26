import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {

    const success = this.auth.login(this.email, this.password);

    if (success) {
      alert("Login Successful!");
      this.router.navigate(['/dashboard']);
    } else {
      alert("Invalid Email or Password");
    }
  }
}