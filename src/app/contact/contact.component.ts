import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  submitForm(form:any){

    if(form.valid){

      alert("Message Sent Successfully!");

      form.reset();

    }
  }

}
