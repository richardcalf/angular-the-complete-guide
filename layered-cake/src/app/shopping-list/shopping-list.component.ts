import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private shoppingSerivce: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {
  }

  ingredients: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;
  private clearedSub: Subscription;
  globalIndex = -1;

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingSerivce.getIngredients();
    // this.subscription = this.shoppingSerivce.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    this.clearedSub = this.shoppingSerivce.formCleared.subscribe(
      () => {
        this.globalIndex = -1;
      }
    )
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    this.clearedSub.unsubscribe();
  }

  selectListItem(i: number) {
    this.shoppingSerivce.editModeInvoked.next(i);
    this.globalIndex = i;
  }
}
