import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}

  userActivated = false;
  private activeSub: Subscription;
  
  ngOnInit() {
    this.activeSub = this.userService.activatedEmitter.subscribe(active => {
      this.userActivated = active;
    });
  }

  ngOnDestroy(): void {
    this.activeSub.unsubscribe();
  }
}
