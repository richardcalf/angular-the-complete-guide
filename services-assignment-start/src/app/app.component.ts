import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   constructor(private usersService: UsersService, private counterService: CounterService) {
    this.counterService.userMovedToActive.subscribe(
      () => {this.myInactiveToActiveCount = this.counterService.inactiveToActiveCount}
    );
    this.counterService.userMovedToInactive.subscribe(
      () => {this.myActiveToInactiveCount = this.counterService.activeToInactiveCount}
    )
   }

   myInactiveToActiveCount = 0;
   myActiveToInactiveCount = 0;

   activeUsers: string[] = [];
   inactiveUsers: string[] = [];

   ngOnInit() {
    this.activeUsers = this.usersService.activeUsers;
    this.inactiveUsers = this.usersService.inactiveUsers;     
   }
}
