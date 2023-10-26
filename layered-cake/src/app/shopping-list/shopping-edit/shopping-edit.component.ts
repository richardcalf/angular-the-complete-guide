import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { addIngredient, updateIngredient, removeIngredient, stopEdit } from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css','../../app.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') htmlForm: NgForm;
  listener: Subscription;
  editMode = false;
  editingItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.listener = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.itemIndex > -1) {
        this.editMode = true;
        this.editingItem = stateData.editingIngredient;
        this.htmlForm.setValue({
          name: this.editingItem.name,
          amount: this.editingItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onClearInputs() {
    this.htmlForm.reset();
    this.editMode = false;
    this.store.dispatch(stopEdit());
  }

  onPersistItem(form: NgForm) {
    const value = form.value;
    const item = new Ingredient(value.name, value.amount);
    if(!this.editMode) {
        this.store.dispatch(addIngredient({ ingredient: item }));
        this.onClearInputs();
    } else {
      this.store.dispatch(updateIngredient({ ingredient: item }));
    }
  }

  onDeleteItem() {
    this.store.dispatch(removeIngredient());
    this.onClearInputs();
  }

  ngOnDestroy(): void {
    this.listener.unsubscribe();
    this.store.dispatch(stopEdit());
  }
}
