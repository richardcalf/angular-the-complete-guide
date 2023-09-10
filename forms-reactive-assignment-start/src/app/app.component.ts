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
  statusUpdate: string = 'PENDING';

  ngOnInit() {
    this.htmlForm = new FormGroup({
      'projectname': new FormControl(null, [Validators.required], this.projectNameNotAllowedAsync),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectstatus': new FormControl(null, Validators.required)
    });

    this.htmlForm.statusChanges.subscribe(
      (s) => {
        this.statusUpdate = s;
        console.log(this.statusUpdate);
      }
    )
  }

  onSubmit() {
    console.log(this.htmlForm);
  }

  // projectNameNotAllowed(control: FormControl): {[s: string]: boolean} {
  //   if (this.NoTestProjectName === control.value) {
  //   return {'testNameNotAllowed': true};
  //   }
  //   return null;
  // }

  projectNameNotAllowedAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({'testNameNotAllowed': true});
        } else {
          resolve(null);
        }
      }, 1200);
    });
    return promise;
  }
}
