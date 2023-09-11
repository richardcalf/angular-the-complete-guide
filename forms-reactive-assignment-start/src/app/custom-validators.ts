import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

export class CustomValidators {

    static  projectNameNotAllowed(control: FormControl): {[s: string]: boolean} {
          if ('Test' === control.value) {
          return {'testNameNotAllowed': true};
          }
          return null;
        }

        static projectNameNotAllowedAsync(control: FormControl): Promise<any> | Observable<any> {
            const promise = new Promise<any>((resolve, reject) => {
              setTimeout(() => {
                if (control.value === 'TestProject') {
                  resolve({'testNameNotAllowed': true});
                } else {
                  resolve(null);
                }
              }, 1200);
            });
            return promise;
          }
}