import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  loginData = {
    email: '',
    password: ''
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
    }, 3000); // disappears after 3 seconds
  }

  onLogin(form: NgForm) {

    if (form.invalid) {
      this.showAlert("Please enter valid details", "error");
      return;
    }

    const success = this.auth.login(
      this.loginData.email.trim(),
      this.loginData.password.trim()
    );

    if (success) {
      this.showAlert("Login Successful! 🎉", "success");
      form.resetForm();

      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 3000);

    } else {
      this.showAlert("Invalid Email or Password ❌", "error");
    }
  }
}