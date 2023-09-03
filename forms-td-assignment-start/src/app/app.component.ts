import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  @ViewChild('f') htmlForm: NgForm;
  defaultTier = 'advanced';
  submitted = false;

  formInfo = {
    email: '',
    subscription: '',
    password: ''
  }

  onSubmit() {
    this.submitted = true;
    this.formInfo.email = this.htmlForm.value.formData.email;
    this.formInfo.subscription = this.htmlForm.value.formData.subscription;
    this.formInfo.password = this.htmlForm.value.formData.thepassword;
    alert('thanks for your submission');
  }
}
