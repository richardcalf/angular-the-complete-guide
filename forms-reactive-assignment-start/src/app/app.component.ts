import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatus = ['Stable','Critical','Finished'];
  htmlForm: FormGroup;
  NoTestProjectName = 'Test';
  statusUpdate: string = 'PENDING';

  ngOnInit() {
    this.htmlForm = new FormGroup({
      'projectname': new FormControl(
        null, 
        [Validators.required, CustomValidators.projectNameNotAllowed], 
        CustomValidators.projectNameNotAllowedAsync),
      'email': new FormControl(
        null, 
        [Validators.required, Validators.email]),
      'projectstatus': new FormControl('Critical', Validators.required)
    });

    this.htmlForm.statusChanges.subscribe(
      (s) => {
        this.statusUpdate = s;
        console.log(this.statusUpdate);
      }
    )
  }

  onSubmit() {
    console.log(this.htmlForm.value);
  }

  
}
