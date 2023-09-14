import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css','../../app.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  htmlForm: FormGroup;
  
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (p: Params) => {
        this.id = +p['id'];
        this.editMode = p['id'] != null;
        this.formInit();
      }
    );
  }

  onSubmit() {
    console.log(this.htmlForm);
  }

  private formInit() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }

    this.htmlForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    });
  }
}
