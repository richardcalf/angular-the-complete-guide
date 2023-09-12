import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  listener: Subscription;
  editMode = false;
  itemIndex: number;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {
    this.listener = this.shoppingService.editModeInvoked
      .subscribe(
        (i: number) => {
          this.editMode = true;
          this.itemIndex = i;
          alert(i);
        }
      );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const item = new Ingredient(value.name, value.amount);
    this.shoppingService.addIngredient(item);
  }

  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }
}
