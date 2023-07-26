import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gamecontrol',
  templateUrl: './gamecontrol.component.html',
  styleUrls: ['./gamecontrol.component.css']
})
export class GamecontrolComponent implements OnInit {
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
    this.gameNumber = 0;
    clearInterval(this.myTimeout);
  }

  incrementGameNumber() {
    this.gameNumber++;
  }

}
