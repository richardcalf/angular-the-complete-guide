import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private shoppingSerivce: ShoppingListService) {
  }

  ingredients: Ingredient[];
  private subscription: Subscription;

  ngOnInit() {
    this.ingredients = this.shoppingSerivce.getIngredients();
    this.subscription = this.shoppingSerivce.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectListItem(i: number) {
    this.shoppingSerivce.editModeInvoked.next(i);
  }
}
