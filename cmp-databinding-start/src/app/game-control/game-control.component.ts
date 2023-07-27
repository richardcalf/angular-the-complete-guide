import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  gameNumber: number = 0;
  myTimeout;
  @Output() myTickEvent = new EventEmitter<{counter: number, type: string}>();

constructor() { }

ngOnInit(): void {
}

onGameStart() {
  this.myTimeout = setInterval(() => {
    this.incrementGameNumber();
    this.myTickEvent.emit({counter: this.gameNumber, type: (this.gameNumber % 2 == 0) ? 'even' : 'odd' });
  }, 1000);
}

onGameStop() {
  clearInterval(this.myTimeout);
}

incrementGameNumber() {
  this.gameNumber++;
}

}
