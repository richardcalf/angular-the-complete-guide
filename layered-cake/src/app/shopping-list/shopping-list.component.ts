import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {
  constructor(private shoppingSerivce: ShoppingListService) {}

  ingredients: Ingredient[];

  ngOnInit() {
    this.ingredients = this.shoppingSerivce.ingredients;
  }

  onShoppingAdded(item: Ingredient) {
    this.shoppingSerivce.addIngredient(item);
  }
}
