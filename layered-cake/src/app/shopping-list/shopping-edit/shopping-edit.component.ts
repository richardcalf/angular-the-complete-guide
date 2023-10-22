import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { addIngredient, updateIngredient, removeIngredient, stopEdit } from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer'
import { state } from '@angular/animations';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css','../../app.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') htmlForm: NgForm;
  listener: Subscription;
  editMode = false;
  itemIndex = -1;
  editingItem: Ingredient;

  constructor(
              // private shoppingService: ShoppingListService, 
              private store: Store<fromShoppingList.AppState>) {}

  ngOnInit(): void {
    this.listener = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.itemIndex > -1) {
        this.editMode = true;
        this.editingItem = stateData.editingIngredient;
        this.itemIndex = stateData.itemIndex;
        this.htmlForm.setValue({
          name: this.editingItem.name,
          amount: this.editingItem.amount
        });

      } else {
        this.editMode = false;
        this.itemIndex = -1;
      }

    });
    // this.listener = this.shoppingService.editModeInvoked
    //   .subscribe(
    //     (i: number) => {
    //       this.editMode = true;
    //       this.itemIndex = i;
    //       this.editingItem = this.shoppingService.getIngredient(i);
    //       this.htmlForm.setValue({
    //         name: this.editingItem.name,
    //         amount: this.editingItem.amount
    //       });
    //     }
    //   );
  }

  onClearInputs() {
    this.htmlForm.reset();
    this.editMode = false;
    this.itemIndex = -1;
    // this.shoppingService.formCleared.next();//???think
    this.store.dispatch(stopEdit());
  }

  onPersistItem(form: NgForm) {
    const value = form.value;
    const item = new Ingredient(value.name, value.amount);
    if(!this.editMode) {
        // this.shoppingService.addIngredient(item);
        this.store.dispatch(addIngredient({ ingredient: item }));
        this.onClearInputs();
    } else {
      this.store.dispatch(updateIngredient({ index: this.itemIndex, ingredient: item }));
      // this.shoppingService.updateIngredient(this.itemIndex, item);
    }
  }

  onDeleteItem() {
    this.store.dispatch(removeIngredient({ index: this.itemIndex }));
    // this.shoppingService.removeIngredient(this.itemIndex);
    this.onClearInputs();
  }

  ngOnDestroy(): void {
    this.listener.unsubscribe();
    this.store.dispatch(stopEdit());
  }
}
