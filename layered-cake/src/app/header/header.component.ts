import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output() ribbonMenuClicked = new EventEmitter<number>();

    onRibbonMenuClicked(menu: number) {
        this.ribbonMenuClicked.emit(menu);
    }

}
