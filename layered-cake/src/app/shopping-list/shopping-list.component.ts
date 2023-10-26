import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { startEdit } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {
  }

  ingredients: Observable<{ingredients: Ingredient[]}>;
  private clearedSub: Subscription;
  globalIndex = -1;

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    this.clearedSub = this.store.select('shoppingList').subscribe(d => {
      this.globalIndex = d.itemIndex;
    });
  }

  ngOnDestroy() {
    this.clearedSub.unsubscribe();
  }

  selectListItem(i: number) {
    this.store.dispatch(startEdit({ index: i }))
    this.globalIndex = i;
  }
}
