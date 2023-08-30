import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() { }

  private subscription: Subscription;

  ngOnInit() {
    const customIntervalObservable = new Observable<number>(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      },1000);

    });

    this.subscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
