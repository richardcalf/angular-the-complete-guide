import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private shoppingSerivce: ShoppingListService, private logService: LoggingService) {
  }

  ingredients: Ingredient[];
  private subscription: Subscription;
  private clearedSub: Subscription;
  globalIndex = -1;

  ngOnInit() {
    this.ingredients = this.shoppingSerivce.getIngredients();
    this.subscription = this.shoppingSerivce.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

    this.clearedSub = this.shoppingSerivce.formCleared.subscribe(
      () => {
        this.globalIndex = -1;
      }
    );

    this.logService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.clearedSub.unsubscribe();
  }

  selectListItem(i: number) {
    this.shoppingSerivce.editModeInvoked.next(i);
    this.globalIndex = i;
  }
}
