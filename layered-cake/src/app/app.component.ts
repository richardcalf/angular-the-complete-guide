import { Component, OnInit } from '@angular/core';
import { AuthenticationSevice } from './auth/auth.service';
import * as fromApp from './store/app.reducer';
import { Store } from "@ngrx/store";
import { autoLogin } from './auth/store/auth.actions'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthenticationSevice, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }
}
