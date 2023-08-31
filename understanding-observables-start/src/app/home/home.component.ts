import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() {}

  private subscription: Subscription;

  ngOnInit() {
    const customIntervalObservable = new Observable<number>(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 3) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      },1000);

    });

    this.subscription = customIntervalObservable.pipe(filter(data => {
      return data > 0
    }),
    
    map(data => {
      return 'Round '+ (data + 1);
    }))
    
    .subscribe(data => {
      console.log(data);
    }, error => { 
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('completed');
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
