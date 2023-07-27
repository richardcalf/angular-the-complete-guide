import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output() shoppingClickEvent = new EventEmitter<number>();
    @Output() recipesClickEvent = new EventEmitter<number>();

    onShoppingClick() {
        this.shoppingClickEvent.emit(1);
    }

    onRecipesClick() {
        this.recipesClickEvent.emit(0);
    }

}
