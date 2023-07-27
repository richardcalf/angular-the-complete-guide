import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   menu: number = -1;

   onNavigate(menu: number) {
    console.log(menu);
    this.menu = menu;
  }
}
