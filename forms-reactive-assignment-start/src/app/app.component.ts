import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatus = ['Stable','Critical','Finished'];
  htmlForm: FormGroup;
  NoTestProjectName = 'Test';

  ngOnInit() {
    this.htmlForm = new FormGroup({
      'projectname': new FormControl(null, [Validators.required, this.projectNameNotAllowed.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectstatus': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    console.log(this.htmlForm);
  }

  projectNameNotAllowed(control: FormControl): {[s: string]: boolean} {
    if (this.NoTestProjectName === control.value) {
    return {'testNameNotAllowed': true};
    }
    return null;
  }
}
