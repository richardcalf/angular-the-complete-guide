import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  htmlForm: FormGroup;
  nogoUserNames = ['Bonnie','Clyde'];

  ngOnInit(): void {
    this.htmlForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.nogoNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.nogoEmails)
    }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.htmlForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );

    this.htmlForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    this.htmlForm.setValue({
      userData: {
        username: 'richie',
        email: 'richie@ngtd.co.au'
      },
      gender: 'male',
      hobbies: []
    });

    this.htmlForm.patchValue({
      userData: {
        username: 'macvalley'
      }
    });
  }

  getControls() {
    return (<FormArray>this.htmlForm.get('hobbies')).controls;
  }

  onSubmit() {
    console.log(this.htmlForm);    
    this.htmlForm.reset({
      gender: 'female'
    });
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.htmlForm.get('hobbies')).push(control);
  }

  nogoNames(control: FormControl): {[s: string]: boolean}  {
    if (this.nogoUserNames.indexOf(control.value) !== -1 ) {
      return {'nameNotAllowed': true};
    }
    return null;
  }

  nogoEmails(control: FormControl): Promise<any> | Observable<any>  {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailNotAllowed': true});
        } else {
          resolve(null);
        }
      }, 1200);
    });
    return promise;
  }
}
