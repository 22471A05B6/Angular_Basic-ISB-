import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
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

  alertMessage: string = '';
  alertType: 'success' | 'error' | '' = '';

  constructor(private auth: AuthService, private router: Router) {}

  showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;

    setTimeout(() => {
      this.alertMessage = '';
      this.alertType = '';
    }, 3000);
  }

  onRegister(form: NgForm) {

    if (form.invalid) {
      this.showAlert("Please fill all fields correctly", "error");
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.showAlert("Passwords do not match ❌", "error");
      return;
    }

    const response = this.auth.register({
      name: this.user.name.trim(),
      email: this.user.email.trim(),
      password: this.user.password.trim()
    });

    if (response.success) {
      this.showAlert("Registration Successful! 🎉", "success");
      form.resetForm();

      setTimeout(() => {
        this.router.navigate(['/signin']);
      }, 1500);

    } else {
      this.showAlert(response.message || "User already exists ❌", "error");
    }
  }
}