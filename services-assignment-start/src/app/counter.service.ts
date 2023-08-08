import { EventEmitter } from "@angular/core";

export class CounterService {
    activeToInactiveCount = 0;
    inactiveToActiveCount = 0;

    userMovedToInactive = new EventEmitter<number>();
    userMovedToActive = new EventEmitter<number>();
}