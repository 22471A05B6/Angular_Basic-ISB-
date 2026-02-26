import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {

    if (this.user.password !== this.user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = this.auth.register({
      name: this.user.name,
      email: this.user.email,
      password: this.user.password
    });

    if (response.success) {
      alert("Registration Successful!");
      this.router.navigate(['/signin']);
    } else {
      alert(response.message);
    }
  }
}