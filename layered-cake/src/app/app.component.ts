import { Component, OnInit } from '@angular/core';
import { AuthenticationSevice } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthenticationSevice) {}

  ngOnInit(): void {
    this.authService.autoSignIn();
  }
}
