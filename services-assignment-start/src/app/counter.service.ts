import { EventEmitter } from "@angular/core";

export class CounterService {
    activeToInactiveCount = 0;
    inactiveToActiveCount = 0;

    countActiveToInactive() {
        this.activeToInactiveCount++;
        console.log('Active to inactive count = ' +this.activeToInactiveCount);
    }

    countInactiveToActive() {
        this.inactiveToActiveCount++;
        console.log('Inactive to active count = ' +this.inactiveToActiveCount);
    }
}