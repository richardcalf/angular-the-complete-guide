import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { ShoppinglistmodifierComponent } from './shoppinglist/shoppinglistmodifier/shoppinglistmodifier.component';
import { RecipelistComponent } from './recipelist/recipelist.component';
import { RecipelistitemComponent } from './recipelist/recipelistitem/recipelistitem.component';
import { RecipelistdetailComponent } from './recipelist/recipelistdetail/recipelistdetail.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppinglistComponent,
    ShoppinglistmodifierComponent,
    RecipelistComponent,
    RecipelistitemComponent,
    RecipelistdetailComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
