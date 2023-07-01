import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('Goulash Recipe','Enjoy the Goulash Stew',
    'https://www.allrecipes.com/thmb/Q9CsPT8f6h5UydohsA5VILBFlrQ=/1500x750/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2400-240708-broccoli-and-chicken-stir-fry-3x4-186-b7f290a400134ae9910f2e67ff50d9f2.jpg'),
    new Recipe('Chorizo Bake Recipe','Enjoy the Chorizo Bake',
    'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-1d16725.jpg')
  ];
}
