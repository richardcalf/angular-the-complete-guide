import { Component } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  constructor(private shoppingService: ShoppingListService) {}

  onAddItem(form: NgForm) {
    const value = form.value;
    const item = new Ingredient(value.name, value.amount);
    this.shoppingService.addIngredient(item);
  }
}
