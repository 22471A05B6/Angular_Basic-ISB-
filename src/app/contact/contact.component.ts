import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  showDialog = false;
  formData: any;

  // ✅ ADD THIS
  toastMessage: string = '';

  submitForm(form: any) {
    if (form.valid) {
      this.formData = form;
      this.showDialog = true;
    }
  }

  confirmSend() {
    this.toastMessage = "Message Sent Successfully! ✅";

    this.formData.reset();
    this.showDialog = false;

    // auto hide toast
    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }

  cancelSend() {
    this.showDialog = false;
  }
}