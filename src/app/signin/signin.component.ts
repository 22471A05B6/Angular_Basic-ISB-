import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, RouterModule,CommonModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  loginData = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onLogin(form: NgForm) {

    if (form.invalid) {
      alert("Please enter valid details");
      return;
    }

    const success = this.auth.login(
      this.loginData.email.trim(),
      this.loginData.password.trim()
    );

    if (success) {
      alert("Login Successful!");
      form.resetForm();
      this.router.navigate(['/dashboard']);
    } else {
      alert("Invalid Email or Password");
    }
  }
}