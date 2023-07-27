import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   menuNumber: number = -1;

  onShoppingClickEvent(number) {
    console.log(number);
    this.menuNumber = number;
  }

  onRecipesClickEvent(number) {
    console.log(number);
    this.menuNumber = number;
  }
}
