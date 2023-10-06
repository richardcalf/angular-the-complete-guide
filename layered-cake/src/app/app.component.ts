import { Component, OnInit } from '@angular/core';
import { AuthenticationSevice } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthenticationSevice, private logService: LoggingService) {}

  ngOnInit(): void {
    this.authService.autoSignIn();
    this.logService.printLog('Hello from AppComponent ngOnInit');
  }
}
