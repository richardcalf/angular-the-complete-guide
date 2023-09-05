import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  htmlForm: FormGroup;

  ngOnInit(): void {
    this.htmlForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
    }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  getControls() {
    return (<FormArray>this.htmlForm.get('hobbies')).controls;
  }

  onSubmit() {
    console.log(this.htmlForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.htmlForm.get('hobbies')).push(control);
  }
}
