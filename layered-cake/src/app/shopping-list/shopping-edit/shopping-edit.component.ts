import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('f') htmlForm: NgForm;
  listener: Subscription;
  editMode = false;
  itemIndex = -1;
  editingItem: Ingredient;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {
    this.listener = this.shoppingService.editModeInvoked
      .subscribe(
        (i: number) => {
          this.editMode = true;
          this.itemIndex = i;
          this.editingItem = this.shoppingService.getIngredient(i);
          this.htmlForm.setValue({
            name: this.editingItem.name,
            amount: this.editingItem.amount
          });
        }
      );
  }

  onClearInputs() {
    this.htmlForm.reset();
    this.editMode = false;
    this.itemIndex = -1;
    this.shoppingService.formCleared.next();
  }

  onPersistItem(form: NgForm) {
    const value = form.value;
    const item = new Ingredient(value.name, value.amount);
    if(!this.editMode) {
        this.shoppingService.addIngredient(item);
        this.onClearInputs();
    } else {
      this.shoppingService.updateIngredient(this.itemIndex, item);
    }
  }

  onDeleteItem() {
    this.shoppingService.removeIngredient(this.itemIndex);
    this.onClearInputs();
  }

  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }
}
