import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];
  
  onTickEvent(tickData: {counter: number, type: string} ) {
    console.log('tick Data:'+ tickData.counter+' '+tickData.type);
    
    if(tickData.type === 'even') {
      this.evenNumbers.push(tickData.counter);
    } else {
      this.oddNumbers.push(tickData.counter);
    }
  }
}
