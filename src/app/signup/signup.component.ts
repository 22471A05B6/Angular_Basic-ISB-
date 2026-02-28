import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule,CommonModule],
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

  onRegister(form: NgForm) {

    if (form.invalid) {
      alert("Please fill all fields correctly");
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = this.auth.register({
      name: this.user.name.trim(),
      email: this.user.email.trim(),
      password: this.user.password.trim()
    });

    if (response.success) {
      alert("Registration Successful!");
      form.resetForm();
      this.router.navigate(['/signin']);
    } else {
      alert(response.message);
    }
  }
}